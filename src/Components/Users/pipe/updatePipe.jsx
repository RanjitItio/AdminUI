import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import axiosInstance from '../../Authentication/axios';
import CustomizedStatusSwitches from './StatusSwitch';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function UpdateMerchantPipe({open, setOpen, merchantpipeUpdateData}) {

  const initialFormData = {
    pipe_name: '',
    fee: 0.00,
    status: false,
    coolingPeriod: '',
  };

  
    // const [pipes, setPipes] = React.useState('');
    const [formData, updateFormData]          = useState(initialFormData);   // Form values state
    const [allPipes, updateAllPipes]          = useState([]);   // All pipe data fetched from API
    const [pipeID, updatePipeID]              = useState(merchantpipeUpdateData.pipe_id || 0);
    const [error, setError]                   = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const MerchantPipeID = merchantpipeUpdateData?.merchant_pipe_id
    const MerchantId     = merchantpipeUpdateData?.merchant_id
    

    // Update the form value field
    useEffect(() => {
      if (merchantpipeUpdateData) {

        updateFormData({
          pipe_name: merchantpipeUpdateData.pipe_name || '',
          fee: (merchantpipeUpdateData.fee) || 0.00,
          status: merchantpipeUpdateData.status || false,
          coolingPeriod: merchantpipeUpdateData?.settlement_period || ''
        });
      
      if (merchantpipeUpdateData.pipe_id) {
          updatePipeID(merchantpipeUpdateData.pipe_id)
      }
    }
  }, [merchantpipeUpdateData]);


    
    // Close the Dialogue Box
    const handleClose = () => {
        setOpen(false);
    };

    
    // Capture form input values
    const handleFormChange = (e)=> {
      const {name, value} = e.target;

      if (name === 'pipe_name') {
        const pipe_locate = allPipes.find((data)=> data.name === value)

        if (pipe_locate) {
          const pipe_id = pipe_locate.id;
          updatePipeID(pipe_id);
        }
      }

      updateFormData({
        ...formData,
        [name]: value
      })
    };
  
    // Call API to fetch all available Pipes
  useEffect(() => {
    axiosInstance.get(`/api/v5/admin/pipe/data/`).then((res)=> {
      //  console.log(res.data.all_pipes_)

       if (res.status === 200 && res.data.all_pipes_) {
          updateAllPipes(res.data.all_pipes_)
       }
  

    }).catch((error)=> {
       console.log(error.response)

    })
  }, []);

 // Remove error value after sometime
 useEffect(() => {
   if (error) {

      setTimeout(() => {
          setError('')
      }, 3000);
      
   }
 }, [error])
 
  

  // Update Merchant pipe data
  const handleUpdateMerchantPipe = ()=> {
        const pipe_fee = parseInt(formData.fee)
        
        axiosInstance.put(`api/admin/merchant/pipe/update/`, {
          merchant_pipe_id: MerchantPipeID,
          merchant_id: MerchantId,
          pipe_id: pipeID,
          fee: pipe_fee,
          status: formData.status,
          cooling_period: formData.coolingPeriod

        }).then((res)=>{ 
          // console.log(res)

          if (res.status === 200) {
              setSuccessMessage('Updated successfully')

              setTimeout(() => {
                  setOpen(false);
                  setSuccessMessage('')
              }, 1500);
          };

        }).catch((error)=> {
          console.log(error.response)

          if (error.response.data.msg === 'Requested pipe id does not exists') {
            setError('Wrong pipe address')
          } else if (error.response.data.msg === 'Merchant not found') {
            setError('Wrong Merchant address')
          } else if (error.response.data.msg === 'Requested merchant pipe does not exists') {
            setError('Wrong merchant pipe address')
          } else if (error.response.data.msg === 'Pipe already assigned'){
             setError('Pipe already assigned to the user')
          } else {
            setError('')
          }
        })
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
                    name='pipe_name'
                    value={formData?.pipe_name || ''}
                    label="Pipes"
                    onChange={(event)=> {handleFormChange(event)}}
                    >
                      {allPipes.map((pipe, index)=> (
                        <MenuItem value={pipe.name} key={index}>{pipe.name}</MenuItem>
                      ))}
                      
                    </Select>
                </FormControl>

                <TextField 
                     id="outlined-basic" 
                     type='number' 
                     name='fee'
                     label="Rate %" 
                     variant="outlined"
                     value={formData.fee} 
                     onChange={handleFormChange}
                     />

                  <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Cooling Period</InputLabel>
                      <Select
                        id="coolingPeriod"
                        name='coolingPeriod'
                        value={formData.coolingPeriod}
                        label="Cooling Period"
                        onChange={handleFormChange}
                      >
                        <MenuItem value='1 Day'>1 Day</MenuItem>
                        <MenuItem value='2 Days'>2 Days</MenuItem>
                        <MenuItem value='3 Days'>3 Days</MenuItem>
                        <MenuItem value='4 Days'>4 Days</MenuItem>
                        <MenuItem value='5 Days'>5 Days</MenuItem>
                        <MenuItem value='6 Days'>6 Days</MenuItem>
                        <MenuItem value='7 Days'>7 Days</MenuItem>
                        <MenuItem value='8 Days'>8 Days</MenuItem>
                        <MenuItem value='9 Days'>9 Days</MenuItem>
                        <MenuItem value='10 Days'>10 Days</MenuItem>
                      </Select>
                  </FormControl>
                  
                <CustomizedStatusSwitches formData={formData} status={formData.status} setStatus={updateFormData} />

            </Box>

        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdateMerchantPipe}>Update</Button>
        </DialogActions>

        {/* Error Message */}
        {error && <p className='text-danger d-flex justify-content-center'>{error}</p>}

        {/* Success Message */}
        {successMessage && <p className='text-success d-flex justify-content-center'>{successMessage}</p>}

      </Dialog>
    </React.Fragment>
  );
}
