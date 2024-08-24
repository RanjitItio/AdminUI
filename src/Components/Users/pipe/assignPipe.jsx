import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CustomizedStatusSwitches from './StatusSwitch';
import { useEffect } from 'react';
import axiosInstance from '../../Authentication/axios';




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function AssignMerchantPipe({open, setOpen, userID}) {

  const initalFormData = {
      status: false,
      fee: 0.00
  }

  const [pipes, setPipes]           = React.useState('');     // Update pipes data state
  const [allPipes, updateAllPipes]  = React.useState([]);     // All api fetched pipes status
  const [formData, updateFormData]  = React.useState(initalFormData) // Form value capture state
  const [error, setError]           = React.useState('');     // Error state
  const [successMessage, setSuccessMessage] = React.useState('');  // Success state



  const handleAllPipeChange = (event) => {
    setPipes(event.target.value);
  };


  const handleClose = () => {
    setOpen(false);
  };


  // Call API to fetch all available Pipes
  useEffect(() => {
    axiosInstance.get(`api/v5/admin/pipe/data/`).then((res)=> {
      //  console.log(res.data.all_pipes_)

       if (res.status === 200 && res.data.all_pipes_) {
          updateAllPipes(res.data.all_pipes_)
       }

    }).catch((error)=> {
       console.log(error.response)

    })
  }, []);


  // Method to capture value from form
  const handelFormValueChange = (event)=> {
       updateFormData({
        ...formData,
        [event.target.name]: event.target.value
       })
  };

  
  // Call API to assign pipe to merchant
  const handleAssignPipeMerchant = ()=> {
    // const percentile_fee = (formData.fee)
    
    if (formData.fee === 0) {
      setError('Please assign fee')

    } else if (pipes === '') {
      setError('Please select Pipe')

    }else if (!formData.fee) {
      setError('Please type Fee')
      
    } else {
      setError('')

          axiosInstance.post(`api/admin/merchant/pipe/assign/`, {
            merchant_id: userID,
            pipe_id:     parseInt(pipes),
            fee:         parseInt(formData.fee),
            status:      formData.status
    
        }).then((res)=> {
            // console.log(res)

            if (res.status === 201) {
              setSuccessMessage('Created successfully')

              setTimeout(() => {
                  setOpen(false)
                  setSuccessMessage('')
              }, 1000);
            } 

        }).catch((error)=> {
            console.log(error.response)
  
            if (error.response.data.msg === 'Merchant pipe already exists') {
              setError('Merchant pipe already exists')

              setTimeout(() => {
                setError('')
              }, 2000);
            } 

        })
    }; 
 };
  



  return (
    <React.Fragment>
     
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Assign pipe to Merchant"}</DialogTitle>
        <DialogContent>

          <Box component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">All Pipes</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={pipes}
                    label="Pipes"
                    onChange={handleAllPipeChange}
                    >
                      {allPipes && allPipes.map((pipes)=> (
                        <MenuItem value={pipes.id} key={pipes.id}>{pipes.name}</MenuItem>
                      ))}
                      
                    </Select>
                </FormControl>

                <TextField 
                    id="outlined-basic" 
                    type='number' 
                    label="Rate %" 
                    variant="outlined"
                    name='fee'
                    onChange={handelFormValueChange}
                      />

                <CustomizedStatusSwitches status={formData.status} setStatus={updateFormData} />
            </Box>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAssignPipeMerchant}>Submit</Button>
        </DialogActions>

        {/* Error Message */}
        {error && <p className='text-danger d-flex justify-content-center'>{error}</p>}

        {/* Success Message */}
        {successMessage && <p className='text-success d-flex justify-content-center'>{successMessage}</p>}

      </Dialog>
    </React.Fragment>
  );
}
