import Paper from '@mui/material/Paper';
import { Main, DrawerHeader } from '../Content';
import TextField from '@mui/material/TextField';
import { Grid, Typography, Box } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { SettleMentPeriodDroDown } from './Column';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/material/Button';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTheme } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../Authentication/axios';





// Select Active and Blocked Countries
const ITEM_HEIGHT      = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


// Validate input url pattern
const validateURL = (url)=> {
    const urlPattern = /^(https:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[-a-zA-Z0-9@:%._\+~#=]*)*(\?[;&a-zA-Z0-9@:%._\+~#=]*)?$/;
    return urlPattern.test(url);
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
  };



// Function to extract names from types
const extractNames = (types) => {
    if (types && Array.isArray(types)) {
        return types.map(type => type.name);
    }
    return [];
};
  

const SettleMentPeriod = SettleMentPeriodDroDown;


// Update Pipe
export default function UpdatePipe({open}) {

    const location = useLocation();
    const navigate = useNavigate();

    const location_pipe_data = location.state?.pipe_data || ''

    const initialFormData = Object.freeze({
        pipe_name:    location_pipe_data?.name || '',
        status:       location_pipe_data?.status || '',
        process_mode: location_pipe_data?.process_mode || '',
        conect_mode:  location_pipe_data?.connection_mode || '',
        // prcs_curr:    location_pipe_data?.process_curr.name
        settle_prd:   location_pipe_data?.settlement_period || '',
        active_cntry: location_pipe_data?.process_country ? location_pipe_data.process_country.split(',') : [],
        block_cntry:  location_pipe_data?.block_country ? location_pipe_data.block_country.split(',') : [],
        mop:          location_pipe_data?.types ? extractNames(location_pipe_data.types) : [],

        test_url:     location_pipe_data?.test_url || '',
        prod_url:     location_pipe_data?.prod_url  || '',
        status_url:   location_pipe_data?.status_url || '',
        refund_url:   location_pipe_data?.refund_url || '',
        white_url:    location_pipe_data?.whitelisting_ip || '',
        white_domain: location_pipe_data?.whitelist_domain || '',
        webhook_url:  location_pipe_data?.webhook_url       || '',

        header:       location_pipe_data?.headers || '',
        body:         location_pipe_data?.body || '',
        query:        location_pipe_data?.query || '',
        auth_keys:    location_pipe_data?.auth_keys || '',

        redirect_msg: location_pipe_data?.redirect_msg || '',
        checkout_label_name: location_pipe_data?.checkout_label || '',
        checout_sub_label_name: location_pipe_data?.checkout_sub_label  || '',
        cmnts:  location_pipe_data?.comments  || '',

        bnk_max_fail_trans:    location_pipe_data?.bank_max_fail_trans_allowed || 0,
        bnk_down_period:       location_pipe_data?.bank_down_period  || '',
        bnk_success_response:  location_pipe_data?.bank_success_resp || '',
        bnk_failed_response:   location_pipe_data?.bank_fail_resp || '',
        bnk_pnding_response:   location_pipe_data?.bank_pending_res  || '',
        bnk_status_path:       location_pipe_data?.bank_status_path  || '',

        bnk_min_trans_limit:   location_pipe_data?.bank_min_trans_limit || 0,
        bnk_max_trans_limit:   location_pipe_data?.bank_max_trans_limit || 0,
        bnk_scrub_period:      location_pipe_data?.bank_scrub_period || '',
        bnk_trans_count:       location_pipe_data?.bank_trxn_count || 0,
        bnk_min_success_count: location_pipe_data?.bank_min_success_cnt || 0,
        bnk_min_failed_cnt:    location_pipe_data?.bank_min_fail_count || 0
    })

    const [status, setStatus]                         = useState(location_pipe_data?.status || '');   // pipe status state
    const [paymentMedium, setPaymentMedium]           = useState(location_pipe_data?.payment_medium || '');   // pipe Payment Medium state
    const [processMode, setProcessMode]               = useState(location_pipe_data?.process_mode || '');   // pipe process mode state
    const [connectionMode, setConnectionMode]         = useState(location_pipe_data?.connection_mode || '');   // pipe connection mode state
    const [settleMentPeriod, setSettleMentPeriod]     = useState(location_pipe_data?.settlement_period || '');   // settlement period state
    const [formData, updateFormData]                  = useState(initialFormData);
    const [mopdata, updateMopData]                    = useState([]);
    const [modeofPayment, setModeofPayment]           = useState([]);
    const [currencies, updateCurrencies]              = useState([]);
    const [processingCurrency, setProcessingCurrency] = useState('');   // processing currecncy state
    const [error, setError]                           = useState('');
    const [mopIDs, updateMopIDs]                      = useState([]);
    const [successMessage, setSuccessMessage]         = useState('');

    // URL ERROR States
    const [testUrlError, setTestUrlError]             = useState('');
    const [prodURlError, setProdURLError]             = useState('');
    const [statusURLError, setStatusURLError]         = useState('');
    const [refundURLError, setRefundURLError]         = useState('');
    const [whiteURLError, setWhiteURLError]           = useState('');
    const [whiteDomainError, setWhitedomainError]     = useState('');
    const [webhookURLError, setWebhookURLError]       = useState('');
    // For Select Active and Blocked countries
    const theme = useTheme();
    const [activeCountry, setActiveCountry] = useState([]);        // Active Countries State
    const [blockedCountry, setBlockedCountry] = useState([]);      // Blocked Countries State



    // Method to handle pipe processing currency
    const handleProcessingCurrencyChange = (event) => {
        setProcessingCurrency(event.target.value);
    };

    // Method to handle Settlement period 
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


    // Update the currency value to the exact pipe currency when page loads
    useEffect(() => {
        if (currencies.length > 0 && location_pipe_data.process_curr) {
            const matchingCurrency = currencies.find(curr => curr.id === location_pipe_data.process_curr.id)

            if (matchingCurrency) {
                setProcessingCurrency(matchingCurrency.id)
            }
        }

    }, [currencies,location_pipe_data.process_curr])
    
    

    // Method to capture all the field values
    const handleFormValueChange = (e)=> {
        const {name, value} = e.target;

        if (name === 'status') {
            setStatus(value)
        }
        else if (name === 'conect_mode') {
            setConnectionMode(value)
        }
        else if (name === 'payment_medium') {
            setPaymentMedium(value)
        }
        else if (name === 'process_mode') {
            setProcessMode(value)
        }
        else if (name === 'test_url') {
            if (!validateURL(value)) {
                setTestUrlError('Please type correct url format');
            } else {
                setTestUrlError('');
            }
        }
        else if (name === 'prod_url') {
            if (!validateURL(value)) {
                setProdURLError('Please type correct url format');
            } else {
                setProdURLError('');
            }
        } else if (name === 'status_url') {
            if (!validateURL(value)) {
                setStatusURLError('Please type correct url format');
            } else {
                setStatusURLError('');
            }
        } else if (name === 'refund_url') {
            if (!validateURL(value)) {
                setRefundURLError('Please type correct url format');
            } else {
                setRefundURLError('');
            }
        } else if (name === 'white_url') {
            if (!validateURL(value)) {
                setWhiteURLError('Please type correct url format');
            } else {
                setWhiteURLError('');
            }
        } else if (name === 'white_domain') {
            if (!validateURL(value)) {
                setWhitedomainError('Please type correct url format');
            } else {
                setWhitedomainError('');
            }
        } else if (name === 'webhook_url') {
            if (!validateURL(value)) {
                setWebhookURLError('Please type correct url format');
            } else {
                setWebhookURLError('');
            }
        }

         updateFormData((prevFormData) => ({
            ...prevFormData, 
            [name]: value
         }))
    };
  

    // Update the form value after submission of form
    const handleFormSubmit = ()=> {

        if (formData.pipe_name === '') {
            setError('Please fill up pipe name')

        } else if (status === '') {
            setError('Please select pipe status')

        } else if (connectionMode === '') {
            setError('Please select pipe connection mode')

        } else if (processMode === '') {
            setError('Please select pipe process mode')

        } else if (processingCurrency === '') {
            setError('Please select processing currency')

        }  else if (processMode === 'Live' && formData.prod_url === '') {
            setError('Please type Production url')
            
        } else if (processMode === 'Test' && formData.test_url === '') {
            setError('Please type Test url')

        } else if (settleMentPeriod === '') {
            setError('Please Select Settlement Period')

        } else {
            setError('')

            axiosInstance.put(`api/v5/admin/pipe/update/`, {
                pipe_id:          location_pipe_data.id,
                pipe_name:        formData.pipe_name,
                status:           status,
                connect_mode:     connectionMode,
                payment_medium:    paymentMedium,

                process_mod:      processMode,
                process_cur:      parseInt(processingCurrency),
                // URL
                prod_url:         formData.prod_url,
                test_url:         formData.test_url,
                status_url:       formData.status_url,
                white_ip:         formData.white_ip,
                webhook_url:      formData.webhook_url,
                white_domain:     formData.white_domain,
    
                headers:          formData.header,
                body:             formData.body,
                query:            formData.query,
                auth_keys:        formData.auth_keys,
    
                types:            mopIDs,
                settlement_prd:   settleMentPeriod,
                refund_url:       formData.refund_url,
                refund_pol:       formData.refund_pol,
    
                auto_refnd:       false,
             
                active_cntry:     activeCountry,
                block_cntry:      blockedCountry,
                
                redirect_msg:     formData.redirect_msg,
                chkout_lable:     formData.checkout_label_name,
                chkout_sub_lable: formData.checout_sub_label_name,
                cmnt:             formData.cmnts,
    
                bnk_max_fail_trans_alwd: formData.bnk_max_fail_trans,
                bnk_dwn_period:          formData.bnk_down_period,
                bnk_sucs_resp:           formData.bnk_success_response,
                bnk_fl_resp:             formData.bnk_fl_resp,
                bnk_pndng_res:           formData.bnk_pnding_response,
                bnk_stus_path:           formData.bnk_status_path,
    
                bnk_min_trans_lmt:       formData.bnk_min_trans_limit,
                bnk_max_trans_lmt:       formData.bnk_max_trans_limit,
                bnk_scrub_period:        formData.bnk_scrub_period,
                bnk_trxn_cnt:            formData.bnk_trans_count,
                bnk_min_sucs_cnt:        formData.bnk_min_success_count,
                bnk_min_fl_count:        formData.bnk_min_fl_count,
    
            }).then((res)=> {
                // console.log(res)
                
                if (res.status === 200) {
                    setSuccessMessage('Updated Successfully')

                    setTimeout(() => {
                        navigate('/admin/pipes/')
                    }, 1000);
                }
            }).catch((error)=> {
                console.log(error.response)
            })
        }
    };

    if (location_pipe_data === '') {
        return (
            <Main open={open}>
            <DrawerHeader />
                <p>Please head back and try to re edit</p>
            </Main>
            
        );
    };


    return (
        <Main open={open}>
        <DrawerHeader />

            <Paper elevation={12} sx={{borderRadius: '20px', border: '1px solid black'}}>

                <Typography 
                       variant='h4' 
                       sx={{marginBottom: '10px', padding:'10px'}}>
                        Update pipe
                </Typography>

                <Grid container spacing={2} sx={{padding: '15px'}}>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            size="small" 
                            label="Gateway ID" 
                            variant="outlined" 
                            fullWidth 
                            disabled
                            value={location_pipe_data.id} 
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                             name='pipe_name'
                             size="small" 
                             label="Pipe Name" 
                             variant="outlined" 
                             fullWidth 
                             onChange={handleFormValueChange}
                             value={formData.pipe_name}
                             />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth size='small'>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name='status'
                            value={status}
                            // value={status === '' ? formData.status : status}
                            label="Status"
                            onChange={(event)=> {handleFormValueChange(event)}}
                            >
                            <MenuItem value={'Active'}>Active</MenuItem>
                            <MenuItem value={'Inactive'}>Inactive</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth size='small'>
                            <InputLabel id="payment-medium-label">Payment Medium</InputLabel>
                            <Select
                                labelId="payment-medium-label"
                                id="payment-medium-label"
                                name='payment_medium'
                                value={paymentMedium}
                                label="Payment Medium"
                                onChange={(event)=> {handleFormValueChange(event)}}
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
                            id="process-mode-simple-select"
                            name='process_mode'
                            value={processMode}
                            label="Processing Mode"
                            onChange={(event)=> {handleFormValueChange(event);}}
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
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name='conect_mode'
                            value={connectionMode}
                            label="Connection Mode"
                            onChange={(event)=> {handleFormValueChange(event);}}
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
                                id="process-currency-simple-select"
                                label="Processing Currency"
                                value={processingCurrency}
                                onChange={handleProcessingCurrencyChange}
                                >
                                    {currencies.map((curr)=> (
                                        <MenuItem key={curr.id} value={curr.id}>{curr.name}</MenuItem>
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
                            name='settle_prd'
                            label="Processing Currency"
                            value={settleMentPeriod === '' ? formData.settle_prd : settleMentPeriod}
                            onChange={(event)=> {handleSettlementPeriodChange(event); handleFormValueChange(event);}}
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
                            <InputLabel id="active-countries-select">Active Countries</InputLabel>
                            <Select
                                label='Active Countries'
                                id="active-countries-select"
                                name='active_cntry'
                                multiple
                                value={activeCountry.length === 0 ? formData.active_cntry : activeCountry}
                                onChange={(event)=> {handleActiveCountriesChange(event); handleFormValueChange(event);}}
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
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            name='block_cntry'
                            multiple
                            value={blockedCountry.length === 0 ? formData.block_cntry : blockedCountry}
                            onChange={(event)=> {handleBlockedCountriesChange(event); handleFormValueChange(event);}}
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
                                id="demo-multiple-chip"
                                name='mop'
                                multiple
                                value={modeofPayment.length === 0 ? formData.mop : modeofPayment}
                                onChange={(event)=> {handleModeofPaymentChange(event); }}
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
                            label="Payment Test/UAT URL"
                            name='test_url' 
                            value={formData.test_url}
                            onChange={handleFormValueChange}
                            variant="outlined" 
                            error={Boolean(testUrlError)}
                            helperText={testUrlError}
                            fullWidth 
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            size="small" 
                            label="Payment Live/Prod URL" 
                            variant="outlined"
                            name='prod_url' 
                            value={formData.prod_url}
                            onChange={handleFormValueChange}
                            error={Boolean(prodURlError)}
                            helperText={prodURlError}
                            fullWidth 
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                             size="small" 
                             label="Status URL" 
                             variant="outlined" 
                             name='status_url'
                             value={formData.status_url}
                             onChange={handleFormValueChange}
                             error={Boolean(statusURLError)}
                             helperText={statusURLError}
                             fullWidth 
                             />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            size="small" 
                            label="Refund URL" 
                            variant="outlined"
                            name='refund_url'
                            value={formData.refund_url}
                            onChange={handleFormValueChange} 
                            error={Boolean(refundURLError)}
                            helperText={refundURLError}
                            fullWidth 
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                              size="small" 
                              label="Whitelisting URL" 
                              variant="outlined"
                              name='white_url'
                              value={formData.white_url} 
                              onChange={handleFormValueChange}
                              error={Boolean(whiteURLError)}
                              helperText={whiteURLError}
                              fullWidth 
                              />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                             size="small" 
                             label="Whitelisting Domain" 
                             variant="outlined"
                             name='white_domain' 
                             value={formData.white_domain}
                             onChange={handleFormValueChange}
                             error={Boolean(whiteDomainError)}
                             helperText={whiteDomainError}
                             fullWidth 
                             />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            size="small" 
                            label="Webhook URL" 
                            variant="outlined" 
                            name='webhook_url'
                            value={formData.webhook_url}
                            onChange={handleFormValueChange}
                            error={Boolean(webhookURLError)}
                            helperText={webhookURLError}
                            fullWidth
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
                            name='header'
                            value={formData.header}
                            onChange={handleFormValueChange}
                            minRows={5}
                            placeholder="Enter Header values"
                            variant="outlined"
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        Body:
                        <Textarea
                            color="primary"
                            name='body'
                            value={formData.body}
                            onChange={handleFormValueChange}
                            minRows={5}
                            placeholder="Enter Payload"
                            variant="outlined"
                            
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        Query:
                        <Textarea
                            color="primary"
                            name='query'
                            value={formData.query}
                            onChange={handleFormValueChange}
                            minRows={3}
                            placeholder="Enter Queries"
                            variant="outlined"
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6}>
                        Auth Keys:
                        <Textarea
                            color="primary"
                            name='auth_keys'
                            value={formData.auth_keys}
                            onChange={handleFormValueChange}
                            minRows={3}
                            placeholder="Enter Auth Keys"
                            variant="outlined"
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

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            size="small" 
                            label="Redirect Message" 
                            variant="outlined" 
                            fullWidth
                            name='redirect_msg'
                            value={formData.redirect_msg}
                            onChange={handleFormValueChange}
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            size="small" 
                            label="Checkout Label Name" 
                            variant="outlined"
                            name='checkout_label_name' 
                            value={formData.checkout_label_name}
                            onChange={handleFormValueChange}
                            fullWidth 
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            size="small" 
                            label="Checkout Sub Label Name" 
                            variant="outlined" 
                            name='checout_sub_label_name'
                            value={formData.checout_sub_label_name}
                            onChange={handleFormValueChange}
                            fullWidth 
                            />
                    </Grid>
                
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            size="small" 
                            label="Tech Comments" 
                            variant="outlined" 
                            name='cmnts'
                            value={formData.cmnts}
                            onChange={handleFormValueChange}
                            fullWidth 
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
                            name='bnk_max_fail_trans'
                            value={formData.bnk_max_fail_trans}
                            onChange={handleFormValueChange}
                            fullWidth 
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            size="small" 
                            label="Down Schedule Period" 
                            variant="outlined" 
                            name='bnk_down_period'
                            value={formData.bnk_down_period}
                            onChange={handleFormValueChange}
                            fullWidth
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                             size="small" 
                             label="Success Response" 
                             variant="outlined" 
                             name='bnk_success_response'
                             value={formData.bnk_success_response}
                             onChange={handleFormValueChange}
                             fullWidth 
                             />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            size="small" 
                            label="Failed Response" 
                            variant="outlined"
                            name='bnk_failed_response' 
                            value={formData.bnk_failed_response}
                            onChange={handleFormValueChange}
                            fullWidth 
                            />
                    </Grid>
                
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            size="small" 
                            label="Pending Response" 
                            variant="outlined" 
                            name='bnk_pnding_response'
                            value={formData.bnk_pnding_response}
                            onChange={handleFormValueChange}
                            fullWidth 
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            size="small" 
                            label="Bank Status Path" 
                            variant="outlined" 
                            name='bnk_status_path'
                            value={formData.bnk_status_path}
                            onChange={handleFormValueChange}
                            fullWidth 
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
                            type='number'
                            name='bnk_min_trans_limit'
                            value={formData.bnk_min_trans_limit}
                            onChange={handleFormValueChange}
                            fullWidth 
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                             size="small" 
                             label="Max Transaction Limit"
                             type='number' 
                             variant="outlined"
                             name='bnk_max_trans_limit' 
                             value={formData.bnk_max_trans_limit}
                             onChange={handleFormValueChange}
                             fullWidth 
                             />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            size="small" 
                            label="Scrubbed Period" 
                            variant="outlined"
                            name='bnk_scrub_period' 
                            value={formData.bnk_scrub_period}
                            onChange={handleFormValueChange}
                            fullWidth 
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                             size="small" 
                             label="Transaction Count" 
                             variant="outlined"
                             name='bnk_trans_count' 
                             type='number'
                             value={formData.bnk_trans_count}
                             onChange={handleFormValueChange}
                             fullWidth 
                             />
                    </Grid>
                
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                            size="small" 
                            label="Minimum Success Count" 
                            variant="outlined" 
                            type='number'
                            name='bnk_min_success_count'
                            value={formData.bnk_min_success_count}
                            onChange={handleFormValueChange}
                            fullWidth 
                            />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <TextField 
                             size="small" 
                             label="Minimum Failed Count" 
                             variant="outlined"
                             type='number'
                             name='bnk_min_failed_cnt' 
                             value={formData.bnk_min_failed_cnt}
                             onChange={handleFormValueChange}
                             fullWidth 
                             />
                    </Grid>

                </Grid>

                 {/* Error Message */}
                 {error && 
                      <Typography variant='p' sx={{color:'#ab003c', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {error}
                    </Typography>
                }  

                 {/* Success Message */}
                 {successMessage && 
                      <Typography variant='p' sx={{color:'green', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {successMessage}
                    </Typography>
                }   

                <Box sx={{alignItems: 'center', display: 'flex', justifyContent: 'center', padding: '10px'}}>
                    <Button 
                        variant="contained" 
                        startIcon={<SaveAltIcon />} 
                        sx={{marginRight: '10px'}}
                        onClick={handleFormSubmit}
                        >
                        Update
                    </Button>
                    <Button variant="outlined" endIcon={<CancelIcon />}>
                        Cancel
                    </Button>
                </Box>

            </Paper>
            
        </Main>
    );
};