import Paper from '@mui/material/Paper';
import { Main, DrawerHeader } from '../Content';
import TextField from '@mui/material/TextField';
import { Grid, Typography, Box } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { SettleMentPeriodDroDown } from './Column';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/material/Button';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import axiosInstance from '../Authentication/axios';
import { useNavigate } from 'react-router-dom';



// Select Active and Blocked Countries
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Countrynames = [
    'India',
    'USA',
    'Russia',
    'China',
    'Canada',
    'Taiwan',
    'UK',
    'Brazil',
    'Israel',
    'Austria',
  ];

  function getStyles(name, countryName, theme) {
    return {
      fontWeight:
        countryName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  

// Select active  and Blocked countries end


const SettleMentPeriod = SettleMentPeriodDroDown;



export default function AddNewPipe({open}) {

    const navigate = useNavigate('');

    const initialFormData = Object.freeze({
        pipe_name: '',
        prod_url: '',
        test_url: '',
        status_url: '',

        headers:    '',
        body:       '',
        query:      '',
        auth_keys:  '',

        payment_medium: '',

        type:       0,
        refund_url: '',
        refund_pol: '',
        // descriptor: '',
        auto_refnd: false,
        white_ip:   '',
        webhook_url: '',
        white_domain: '',
        // login_cred:  '',
        redirect_msg: '',
        chkout_lable:  '',
        chkout_sub_lable: '',
        cmnt: '',

        // bnk_max_fail_trans_alwd: 0,
        // bnk_dwn_period: '',
        // bnk_sucs_resp: '',
        // bnk_fl_resp:  '',
        // bnk_pndng_res: '',
        // bnk_stus_path: '',

        bnk_min_trans_lmt: 0,
        bnk_max_trans_lmt: 0,
        bnk_scrub_period:  '',
        bnk_trxn_cnt:      0,
        bnk_min_sucs_cnt:  0,
        bnk_min_fl_count:  0
    })

    const [status, setStatus]                         = useState('');   // Pipe status state
    const [processMode, setProcessMode]               = useState('');   // Process Mode state
    const [connectionMode, setConnectionMode]         = useState('');   // Connection Mode State
    const [processingCurrency, setProcessingCurrency] = useState('');   // Processing Currency State
    const [settleMentPeriod, setSettleMentPeriod]     = useState('');   // Settlement Period State
    const [currencies, updateCurrencies]              = useState([]);   // State to Store all API fetched currencies
    const [formData, updateFormData]                  = useState(initialFormData);  // State to get all field value
    const [modeofPayment, setModeofPayment]           = useState([]);   // Mode of Payment State
    const [mopdata, updateMopData]                    = useState([]);   // Mop data value In drop down
    const [mopIDs, updateMopIDs]                      = useState([]);   // Mode of Payment ID status
    const [error, setError]                           = useState('');  // Error Message
    const [disableSubmit, setDisableSubmit]           = useState(false);
    const [paymentMedium, setPaymentMedium]           = useState('');



    // For Select Active and Blocked countries
    const  theme = useTheme();
    const [activeCountry, setActiveCountry] = useState([]);        // Active Countries State
    const [blockedCountry, setBlockedCountry] = useState([]);      // Blocked Countries State

    // console.log(formData)
    // Method to get selected data from form
    const handelFormChange = (e)=> {
        updateFormData({...formData, 
            [e.target.name]: e.target.value
        })
    };

    // Method to handle status of pie
    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handlePaymentMediumChange = (event) => {
        setPaymentMedium(event.target.value);
    };

    // Method to handle processing mode of pipe
    const handleProcessModeChange = (event) => {
        setProcessMode(event.target.value);
    };

    // Method to handle connection mode of pipe
    const handleConnectionModeChange = (event) => {
        setConnectionMode(event.target.value);
    };

    // Method to handle processing currency 
    const handleProcessingCurrencyChange = (event) => {
        setProcessingCurrency(event.target.value);
    };

    // Method for settlement period
    const handleSettlementPeriodChange = (event) => {
        setSettleMentPeriod(event.target.value);
    };

    // Method to handle Active countries value
    const handleActiveCountriesChange = (event) => {
        const {
          target: { value },
        } = event;
        setActiveCountry(
          typeof value === 'string' ? value.split(',') : value,
        );
      };


    // Method to handle Blocked countries value
    const handleBlockedCountriesChange = (event) => {
        const {
          target: { value },
        } = event;
        setBlockedCountry(
          typeof value === 'string' ? value.split(',') : value,
        );
      };

    //   console.log(mopIDs)
    // Method to handle Mode of payments value
    const handleModeofPaymentChange = (event) => {
        const {target: { value },} = event;
        setModeofPayment(
          typeof value === 'string' ? value.split(',') : value,
        );

        const selectedIDs = mopdata.filter((data)=> 
           value.includes(data.name)).map((data)=> 
            data.id);

        updateMopIDs(selectedIDs);
      };

    // Fetch all the currency when the page loads
    useEffect(() => {
        axiosInstance.get(`api/v2/currency/`).then((res)=> {
            // console.log(res.data.currencies)

            if (res.status === 200 && res.data.currencies) {
                updateCurrencies(res.data.currencies)
            }
        }).catch((error)=> {
            console.log(error.response)
        })
    }, [])


    // Fetch all the Pipe type(MOP) when the page loads
    useEffect(() => {
        axiosInstance.get(`api/v5/admin/pipe/types/`).then((res)=> {
            // console.log(res.data.currencies)

            if (res.status === 200 && res.data.all_pipe_type) {
                updateMopData(res.data.all_pipe_type)
            }
        }).catch((error)=> {
            console.log(error.response)
        })
    }, []);



    // Call API on Submit to create a new pipe
    const handleSubmitButtonClicked = ()=> {

        if (formData.pipe_name === '') {
            setError('Please fill pipe name')
        }
        else if (status === '') {
            setError('Please select status')
        }
        else if (processMode === '') {
            setError('Please select processing mode')
        }
        else if (connectionMode === '') {
            setError('Please select connection mode')
        }
        else if (paymentMedium === '') {
            setError('Please select Payment medium')
        }
        else if (processingCurrency === '') {
            setError('Please select processing currency')
        }
        else if (processMode === 'Live' && formData.prod_url === '') {
            setError('Please type Production url')
        }
        else if (processMode === 'Test' && formData.test_url === '') {
            setError('Please type Test url')
        }
         else {
            setError('')
            setDisableSubmit(true);

        // Call API to Assign pipe to the Merchant
        axiosInstance.post(`api/v5/admin/pipe/new/`, {
            pipe_name:        formData.pipe_name,
            status:           status,
            connect_mode:     connectionMode, 
            payment_medium:   paymentMedium,
            // URL
            prod_url:         formData.prod_url,
            test_url:         formData.test_url,
            status_url:       formData.status_url,
            process_mod:      processMode,
            process_cur:      parseInt(processingCurrency),

            headers:          formData.headers,
            body:             formData.body,
            query:            formData.query,
            auth_keys:        formData.auth_keys,

            type:             mopIDs,
            settlement_prd:   settleMentPeriod,
            refund_url:       formData.refund_url,
            refund_pol:       formData.refund_pol,

            auto_refnd:       false,
            white_ip:         formData.white_ip,
            webhook_url:      formData.webhook_url,
         
            white_domain:     formData.white_domain,
            active_cntry:     activeCountry,
            block_cntry:      blockedCountry,
            redirect_msg:     formData.redirect_msg,
            chkout_lable:     formData.chkout_lable,
            chkout_sub_lable: formData.chkout_sub_lable,
            cmnt:             formData.cmnt,

            // bnk_max_fail_trans_alwd: formData.bnk_max_fail_trans_alwd,
            // bnk_dwn_period:          formData.bnk_dwn_period,
            // bnk_sucs_resp:           formData.bnk_sucs_resp,
            // bnk_fl_resp:             formData.bnk_fl_resp,
            // bnk_pndng_res:           formData.bnk_pndng_res,
            // bnk_stus_path:           formData.bnk_stus_path,

            bnk_min_trans_lmt:       formData.bnk_min_trans_lmt,
            bnk_max_trans_lmt:       formData.bnk_max_trans_lmt,
            bnk_scrub_period:        formData.bnk_scrub_period,
            bnk_trxn_cnt:            formData.bnk_trxn_cnt,
            bnk_min_sucs_cnt:        formData.bnk_min_sucs_cnt,
            bnk_min_fl_count:        formData.bnk_min_fl_count,

        }).then((res)=> {
            // console.log(res)

            if (res.status === 201) {
                
                setTimeout(() => {
                    navigate('/admin/pipes/')
                }, 1500);
            }

       }).catch((error)=> {
           console.log(error.response)

           if (error.response.data.msg === 'Pipe Name already exists') {
                setError('Pipe Name already exists')
           }

       });
    }
};
    

    return (
        <Main open={open}>
        <DrawerHeader />

            <Paper elevation={12} sx={{borderRadius: '20px', border: '1px solid black'}}>

                <Typography 
                       variant='h4' 
                       sx={{marginBottom: '10px', padding:'10px'}}>
                        Add new pipe
                </Typography>

                <Grid container spacing={2} sx={{padding: '15px'}}>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                              size="small" 
                              name='pipe_name'
                              label="Pipe Name" 
                              variant="outlined" 
                              fullWidth 
                              onChange={handelFormChange}
                              />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth size='small'>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={status}
                            label="Status"
                            onChange={handleStatusChange}
                            
                            >
                            <MenuItem value={'Active'}>Active</MenuItem>
                            <MenuItem value={'Inactive'}>Inactive</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth size='small'>
                            <InputLabel id="payemnt-medium-label">Payment Medium</InputLabel>
                            <Select
                            labelId="payemnt-medium-label"
                            id="payemnt-medium-label"
                            value={paymentMedium}
                            label="Payment Medium"
                            onChange={handlePaymentMediumChange}
                            >
                            <MenuItem value={'UPI'}>UPI</MenuItem>
                            <MenuItem value={'Card'}>Card</MenuItem>
                            <MenuItem value={'Net Banking'}>Net Banking</MenuItem>
                            <MenuItem value={'Wallet'}>Wallet</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth size='small'>
                            <InputLabel id="demo-simple-select-label">Processing Mode</InputLabel>
                            <Select
                            id="demo-simple-select"
                            value={processMode}
                            label="Processing Mode"
                            onChange={handleProcessModeChange}
                            >
                            <MenuItem value={'Live'}>Live</MenuItem>
                            <MenuItem value={'Test'}>Test</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth size='small'>
                            <InputLabel id="demo-simple-select-label">Connection Mode</InputLabel>
                            <Select
                            id="demo-simple-select"
                            value={connectionMode}
                            label="Connection Mode"
                            onChange={handleConnectionModeChange}
                            >
                            <MenuItem value={'Curl'}>Direct(Curl)</MenuItem>
                            <MenuItem value={'Redirect(GET)'}>Redirect(GET)</MenuItem>
                            <MenuItem value={'Redirect(POST)'}>Redirect(POST)</MenuItem>
                            <MenuItem value={'S2S'}>S2S</MenuItem>
                            <MenuItem value={'Whitelisting IP'}>WhiteListing IP - Redirect POST Method</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth size='small'>
                            <InputLabel id="demo-simple-select-label">Processing Currency</InputLabel>
                            <Select
                            labelId="process-currency-simple-select-label"
                            id="process-currency-simple-select"
                            label="Processing Currency"
                            value={processingCurrency}
                            onChange={(event)=> {handleProcessingCurrencyChange(event)}}
                            >
                                {currencies.map((currency, index)=> (
                                    <MenuItem value={currency.id} key={index}>{currency.name}</MenuItem>
                                ))}
                                
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth size='small'>
                            <InputLabel id="demo-simple-select-label">Settlement Period</InputLabel>
                            <Select
                            labelId="process-currency-simple-select-label"
                            id="process-currency-simple-select"
                            label="Processing Currency"
                            value={settleMentPeriod}
                            onChange={handleSettlementPeriodChange}
                            >
                                {SettleMentPeriod.map((period)=> (
                                    <MenuItem key={period.value} value={period.label}>
                                        {period.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth size='small'>
                            <InputLabel id="demo-multiple-chip-label">Active Countries</InputLabel>
                            <Select
                            id="demo-multiple-chip"
                            multiple
                            value={activeCountry}
                            onChange={handleActiveCountriesChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Active Countries" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                            >
                            {Countrynames.map((name) => (
                                <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, activeCountry, theme)}
                                >
                                {name}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </Grid>


                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth size='small'>
                            <InputLabel id="demo-multiple-chip-label">Blocked Countries</InputLabel>
                            <Select
                            id="demo-multiple-chip"
                            multiple
                            value={blockedCountry}
                            onChange={handleBlockedCountriesChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Blocked Countries" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                            >
                            {Countrynames.map((name) => (
                                <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, activeCountry, theme)}
                                >
                                {name}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </Grid>


                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth size='small'>
                            <InputLabel id="demo-multiple-chip-label">Mode of Payment</InputLabel>
                            <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={modeofPayment}
                            onChange={handleModeofPaymentChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Mode of Payment" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                            >
                            {mopdata.map((data) => (
                                <MenuItem
                                key={data.id}
                                value={data.name}
                                style={getStyles(data.name, modeofPayment, theme)}
                                >
                                {data.name}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </Grid>

                </Grid>

                {/* URL Section */}
                <Typography 
                    variant='p' 
                    sx={{marginBottom: '10px', padding:'10px', marginLeft: '10px'}}>
                    <b>URL:</b>
                </Typography>

                <Grid container spacing={2} sx={{padding: '15px'}}>
            
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                              size="small" 
                              name='test_url'
                              label="Payment Test/UAT URL" 
                              variant="outlined" 
                              fullWidth 
                              onChange={handelFormChange}
                              />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                             size="small"
                             name='prod_url' 
                             label="Payment Live/Prod URL" 
                             variant="outlined" 
                             fullWidth 
                             onChange={handelFormChange}
                             />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                             size="small"
                             name='status_url' 
                             label="Status URL" 
                             variant="outlined" 
                             fullWidth 
                             onChange={handelFormChange}
                             />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            size="small" 
                            name='refund_url'
                            label="Refund URL" 
                            variant="outlined" 
                            fullWidth 
                            onChange={handelFormChange}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            size="small"
                            name='white_ip' 
                            label="Whitelisting URL" 
                            variant="outlined" 
                            fullWidth 
                            onChange={handelFormChange}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            size="small" 
                            label="Whitelisting Domain" 
                            variant="outlined" 
                            fullWidth 
                            name='white_domain'
                            onChange={handelFormChange}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            size="small" 
                            name='webhook_url'
                            label="Webhook URL" 
                            variant="outlined" 
                            fullWidth 
                            onChange={handelFormChange}
                            />
                    </Grid>

                </Grid>

                {/* Credential Section */}
                <Typography 
                    variant='p' 
                    sx={{marginBottom: '10px', padding:'10px', marginLeft: '10px'}}>
                    <b>CREDENTIALS:</b>
                </Typography>

                <Grid container spacing={2} sx={{padding: '15px'}}>
                    <Grid item xs={12} sm={6} md={6}>
                        Header:
                        <Textarea
                            color="primary"
                            name='headers'
                            minRows={5}
                            placeholder="Enter Header values"
                            variant="outlined"
                            onChange={handelFormChange}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        Body:
                        <Textarea
                            color="primary"
                            name='body'
                            minRows={5}
                            placeholder="Enter Payload"
                            variant="outlined"
                            onChange={handelFormChange}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        Query:
                        <Textarea
                            color="primary"
                            name='query'
                            minRows={3}
                            placeholder="Enter Queries"
                            variant="outlined"
                            onChange={handelFormChange}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        Auth Keys:
                        <Textarea
                            color="primary"
                            name='auth_keys'
                            minRows={3}
                            placeholder="Enter Auth Keys"
                            variant="outlined"
                            onChange={handelFormChange}
                            />
                    </Grid>

                </Grid>

                {/* Additional Info Section */}
                <Typography 
                    variant='p' 
                    sx={{marginBottom: '10px', padding:'10px', marginLeft: '10px'}}>
                    <b>Additional Info:</b>
                </Typography>

                <Grid container spacing={2} sx={{padding: '15px'}}>
            
                    {/* <Grid item xs={12}>
                        <Textarea
                            color="primary"
                            minRows={3}
                            placeholder="Enter processing credentials"
                            variant="outlined"
                            />
                    </Grid> */}

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                              size="small"
                              name='redirect_msg' 
                              label="Redirect Message" 
                              variant="outlined" 
                              fullWidth 
                              onChange={handelFormChange}
                              />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                              size="small" 
                              label="Checkout Label Name" 
                              variant="outlined" 
                              fullWidth 
                              name='chkout_lable'
                              onChange={handelFormChange}
                              />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                              size="small" 
                              label="Checkout Sub Label Name" 
                              variant="outlined" 
                              fullWidth 
                              name='chkout_sub_lable'
                              onChange={handelFormChange}
                              />
                    </Grid>
                
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                             size="small" 
                             label="Tech Comments" 
                             variant="outlined" 
                             fullWidth 
                             name='cmnt'
                             onChange={handelFormChange}
                             />
                    </Grid>

                </Grid>

                <Typography 
                    variant='p' 
                    sx={{marginBottom: '10px', padding:'10px', marginLeft: '10px'}}>
                    <b>Bank Response:</b>
                </Typography>

                <Grid container spacing={2} sx={{padding: '15px'}}>
            
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            size="small" 
                            label="Max Continuous Failed Transaction Allowed" 
                            variant="outlined" 
                            fullWidth 
                            name='bnk_max_fail_trans_alwd'
                            onChange={handelFormChange}
                            type='number'
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            size="small" 
                            label="Down Schedule Period" 
                            variant="outlined" 
                            fullWidth 
                            name='bnk_dwn_period'
                            onChange={handelFormChange}
                             />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                              size="small" 
                              label="Success Response" 
                              variant="outlined" 
                              fullWidth 
                              name='bnk_sucs_resp'
                              onChange={handelFormChange}
                              />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                              size="small" 
                              label="Failed Response" 
                              variant="outlined" 
                              fullWidth 
                              name='bnk_fl_resp'
                              onChange={handelFormChange}
                              />
                    </Grid>
                
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                             size="small" 
                             label="Pending Response" 
                             variant="outlined" 
                             fullWidth 
                             name='bnk_pndng_res'
                             onChange={handelFormChange}
                             />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                             size="small" 
                             label="Bank Status Path" 
                             variant="outlined" 
                             fullWidth 
                             name='bnk_stus_path'
                             onChange={handelFormChange}
                             />
                    </Grid>

                </Grid>


                <Typography 
                    variant='p' 
                    sx={{marginBottom: '10px', padding:'10px', marginLeft: '10px'}}>
                    <b>Bank Transactions:</b>
                </Typography>

                <Grid container spacing={2} sx={{padding: '15px'}}>
            
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                             size="small" 
                             label="Min Transaction Limit" 
                             variant="outlined" 
                             fullWidth 
                             name='bnk_min_trans_lmt'
                             onChange={handelFormChange}
                             type='number'
                             />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                              size="small" 
                              label="Max Transaction Limit" 
                              variant="outlined" 
                              fullWidth 
                              name='bnk_max_trans_lmt'
                              onChange={handelFormChange}
                              type='number'
                              />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                              size="small" 
                              label="Scrubbed Period" 
                              variant="outlined" 
                              fullWidth 
                              name='bnk_scrub_period'
                              onChange={handelFormChange}
                              />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                             size="small" 
                             label="Transaction Count" 
                             variant="outlined" 
                             fullWidth 
                             name='bnk_trxn_cnt'
                             onChange={handelFormChange}
                             type='number'
                             />
                    </Grid>
                
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            size="small" 
                            label="Minimum Success Count" 
                            variant="outlined" 
                            fullWidth
                            type='number'
                            name='bnk_min_sucs_cnt'
                            onChange={handelFormChange}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            size="small" 
                            label="Minimum Failed Count" 
                            variant="outlined" 
                            fullWidth
                            name='bnk_min_fl_count' 
                            onChange={handelFormChange}
                            type='number'
                            />
                    </Grid>

                </Grid>

                {/* Error Message */}
                {error && 
                      <Typography variant='p' sx={{color:'#ab003c', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {error}
                    </Typography>
                }


                <Box sx={{alignItems: 'center', display: 'flex', justifyContent: 'center', padding: '10px'}}>
                    <Button 
                        variant="contained" 
                        startIcon={<SaveAltIcon />} 
                        sx={{marginRight: '10px'}}
                        onClick={handleSubmitButtonClicked}
                        disabled={disableSubmit}
                        >
                        Submit
                    </Button>
                    <Button variant="outlined" endIcon={<CancelIcon />}>Cancel</Button>
                </Box>

                

            </Paper>
            
        </Main>
    );
};