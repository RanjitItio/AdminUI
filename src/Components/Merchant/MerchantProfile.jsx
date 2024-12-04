import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Nav, Form, } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Main, DrawerHeader } from "../Content"
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../Authentication/axios';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import MerchantPaymentTableColumn from './ColumName';
import { styled } from '@mui/material/styles';
import Textarea from '@mui/joy/Textarea';
// import MerchantPaymentTable from './MerchantPayment';


// const MerchantPaymentTableHead = MerchantPaymentTableColumn;
// const TransactionTableName = "Payments";
// const DemoMerchantPaymentData = []


const BoldTextField = styled(TextField) ({
    '& .MuiInputBase-input': {
    fontWeight: 'bold',
  },
});


// Edit Business Profile
const MerchantProfile = ({ open }) => {
    const navigate    = useNavigate();
    
    const location       = useLocation();
    const aboutMerchant  = location.state?.merchant;
    const aboutUser      = location.state?.user;
    const aboutGroup     = location.state?.group;
    const aboutCurrency  = location.state?.currency;


    const initialMerchantData = {
        business_name: aboutMerchant?.bsn_name || '',
        business_url:  aboutMerchant?.bsn_url || '',
        currency:      aboutCurrency?.name || '',
        group:         aboutGroup?.name || '',
        merchant_id:   aboutMerchant?.id || '',
        status:        aboutMerchant?.status || '',
        business_msg:  aboutMerchant?.bsn_msg || '',
        fee:           '',
        merchant_img:  null
    };

    const [allGroup, updateAllGroup]              = useState([])
    const [groupValue, setGroupValue]             = useState('');
    const [currencies, updateCurrencies]          = useState([]);
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [merchantFee, updateMerchantFee]        = useState(aboutMerchant?.fee || '');
    const [feeValue, setFeeValue]                 = useState(0.00); //Value to send in API
    const [statusValue, setStatusValue]           = useState(aboutMerchant?.status || '');
    const [activeTab, setActiveTab]               = useState('profile');
    const [error, setError]                       = useState('')
    const [successMessage, setSuccessMessage]     = useState('')
    const [groupID, setGroupID]                   = useState(1)
    const [formData, updateFormData]              = useState(initialMerchantData);


    //Update the Group value after page load for blank group value warning
    useEffect(() => {
        setTimeout(() => {
            setGroupValue(aboutGroup?.name || '')
        }, 1000);
    }, []);


    //Update the Currency value after page load for blank group value warning
    useEffect(() => {
        setTimeout(() => {
            setSelectedCurrency(aboutCurrency?.name || '')
        }, 1000);
    }, []);


    // //Update the Status value after page load for blank group value warning
    useEffect(() => {
        setTimeout(() => {
            updateMerchantFee(aboutMerchant?.fee || 'NA')
        }, 1000);
    }, [])

    
    // console.log(formData)
    const handleMerchantDetailChange = (event) => {
        const {name, value, files} = event.target;

        if (name == 'merchant_img') {
            updateFormData({...formData,
                [name]: files[0]
            })

        } else {
            updateFormData({...formData,
                [name]: value,
            })
        }
        
    };

    /// Group value data
    const handleGroupValueChange = (event) => {

        const selectedGroupName   = event.target.value;
        const selectedGroup       = allGroup.find(group => group.name === selectedGroupName);

        setGroupValue(selectedGroup ? selectedGroup.name : 1)
        setGroupID(selectedGroup ? selectedGroup.id : 1)

    };

    // Selected currency data
    const handleSelctedCurrencyChange = (event) => {
        setSelectedCurrency(event.target.value)
    };

    // Status value
    const handleStatusValueUpdate = (event) => {
        setStatusValue(event.target.value)
    };


    const handleMerchantFee = (event)=> {
        const value = event.target.value;

        if (value === 'Gold') {
            updateMerchantFee(0.01)
            setFeeValue(0.01)

        } else if(value === 'Bronze') {
            updateMerchantFee(0.02)
            setFeeValue(0.02)

        } else if(value == 'Premium') {
            updateMerchantFee(0.005)
            setFeeValue(0.005)

        } else if (value === 'Silver') {
            updateMerchantFee(0.015)
            setFeeValue(0.015)
        }
    };


// Fetch all Group from API
    useEffect(() => {
        axiosInstance.get(`api/merchant/groups/`).then((res)=> {
        // console.log(res.data.data)
        if (res.status === 200) {
            updateAllGroup(res.data.data)
        }
    }).catch((error)=> {
        console.log(error)
    })
    }, []);
    

// Fetch all Currencies from API
    useEffect(() => {
        axiosInstance.get(`api/v2/currency/`).then((res)=> {
        // console.log(res.data.data)
        if (res.status === 200) {
            updateCurrencies(res.data.currencies)
        }
    }).catch((error)=> {
        console.log(error)
    })
    }, []);



useEffect(() => {
    if (error || successMessage) {
        const timer = setTimeout(() => {
            setError('');
            setSuccessMessage('');
        }, 3000); 

        return () => clearTimeout(timer);
    }
}, [error, successMessage]);



// Cancel button clicked event
const handleCancelButtonClicked = ()=> {
    navigate('/admin/merchant/')
};


// Method to handel form Submit
const handleFormSubmit = ()=> {

    if (formData.business_name === '') {
        setError('Please type Business name')

    } else if (formData.business_url === '') {
        setError('Please type Business URL')

    } else if (formData.currency === '') {
        setError('Please select Transaction Currency')

    } else if (formData.group === '') {
        setError('Please select group')

    } else if (formData.status === '') {
        setError('Please select Merchant status')

    } else if (merchantFee === '') {
        setError('Please select group to add Merchant fee')

    } else {
        const formDataObj = new FormData();

        formDataObj.append('bsn_name',    formData.business_name)
        formDataObj.append('bsn_url',     formData.business_url)
        formDataObj.append('currency',    formData.currency)
        formDataObj.append('group',       formData.group)
        formDataObj.append('merchant_id', formData.merchant_id)
        formDataObj.append('status',      formData.status)
        formDataObj.append('fee',         merchantFee)
        formDataObj.append('logo',        formData.merchant_img)
    
        axiosInstance.put(`api/admin/merchant/update/`, formDataObj, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        ).then((res)=> {
            // console.log(res)
            if (res.status === 200) {
                setSuccessMessage("Updated Successfully")

                setTimeout(() => {
                    navigate('/admin/merchant/')
                }, 2000);
            }
    
        }).catch((error)=> {
            console.log(error)

            if (error.response.data.error === `could not convert string to float: 'NA'`) {
                setError('Please select group to assign Merchant fee')
            }
        })
    }
    
};


// Status message
const getStatus = (status) => {
    switch (status) {
      case 'Moderation':
        return <small className="text-warning  mx-1">Moderation</small>
      case 'Approved':
        return <small className="text-success  mx-1">Approved</small>;
      case 'Cancelled':
        return <small className="text-danger  mx-1">Rejected</small>
      default:
        return 'NA';
    }
  };

   
  // Abscence of State value
  if (location.state === null) {
    return (
        <Main open={open}>
        <DrawerHeader />
            <p>Please <Link to={'/admin/merchant/'}>Click</Link> on this link and try to reedit</p>
        </Main>
    )
  };


    return (
        <Main open={open}>
            <DrawerHeader />

            <Container fluid >
                <Row className="my-3">
                    <Col>
                        <Nav variant="tabs" activeKey={activeTab} onSelect={setActiveTab}>
                            <Nav.Item>
                                <Nav.Link eventKey="profile">Profile</Nav.Link>
                            </Nav.Item>

                            {/* <Nav.Item>
                                <Nav.Link eventKey="transactions">Payments</Nav.Link>
                            </Nav.Item> */}
                        </Nav>
                    </Col>
                </Row>
                {activeTab === 'profile' && (
                    <Card className='shadow' style={{maxWidth: '55rem'}}>
                        <Card.Body>
                            <Row className="">
                                <Col className="d-flex justify-content-start">
                                    <h4>{aboutUser?.full_name || 'NA'}</h4>
                                    {aboutMerchant ? getStatus(aboutMerchant.status): 'NA'}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                )}

                
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <Row>
                        <Col md={6} lg={10} className="mb-3">
                            <Card className='shadow'>
                                <Card.Body>
                                    <Form>
                                    <Grid container spacing={2} sx={{marginBottom: '10px'}}>

                                        <Grid item xs={12} md={4}>
                                            <Form.Group className="mb-3">
                                                <BoldTextField 
                                                    label="Merchant ID" 
                                                    name='merchantID' 
                                                    variant="outlined"
                                                    disabled
                                                    fullWidth 
                                                    value={aboutMerchant?.id || 'NA'}
                                                    onChange={handleMerchantDetailChange}
                                                    />
                                            </Form.Group>
                                        </Grid>
                                        
                                        <Grid item xs={12} md={4}>
                                            <Form.Group className="mb-3">
                                                <TextField 
                                                      label="Business Name" 
                                                      name='business_name' 
                                                      value={formData.business_name}
                                                      variant="outlined"  
                                                      fullWidth 
                                                      onChange={handleMerchantDetailChange}
                                                    />
                                            </Form.Group>
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <Form.Group className="mb-3">
                                                <TextField
                                                    // country={'us'}
                                                    variant="outlined"
                                                    label="Business URL"
                                                    name='business_url'
                                                    value={formData.business_url}
                                                    onChange={handleMerchantDetailChange}
                                                    fullWidth
                                                />
                                            </Form.Group>
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <Form.Group className="mb-3">
                                                <FormControl fullWidth variant="outlined">
                                                    <InputLabel>Currency</InputLabel>
                        
                                                    <Select
                                                        value={selectedCurrency}
                                                        onChange={(event)=> {handleMerchantDetailChange(event), handleSelctedCurrencyChange(event)}}
                                                        label="Currency"
                                                        name='currency'
                                                        >
                                                            {currencies.map((currency) => (
                                                                <MenuItem key={currency.id} value={currency.name}>
                                                                    {currency.name}
                                                                </MenuItem>
                                                            ))}
                                                    </Select>
                                            
                                                </FormControl>
                                            </Form.Group>
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <Form.Group className="mb-3">
                                                <FormControl fullWidth variant="outlined">
                                                    <InputLabel>Group</InputLabel>
                        
                                                    <Select
                                                        value={groupValue}
                                                        onChange={(event)=> {handleMerchantDetailChange(event), handleGroupValueChange(event); handleMerchantFee(event);}}
                                                        label="Group"
                                                        name='group'
                                                        >
                                                            {allGroup.map((group) => (
                                                                <MenuItem key={group.id} value={group.name}>
                                                                    {group.name}
                                                                </MenuItem>
                                                            ))}
                                                    </Select>
                                            
                                                </FormControl>
                                            </Form.Group>
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <Form.Group className="mb-3">
                                                <FormControl fullWidth variant="outlined">
                                                    <InputLabel>Status</InputLabel>
                                                    <Select
                                                        value={statusValue}
                                                        onChange={(event) => {handleMerchantDetailChange(event); handleStatusValueUpdate(event);}}
                                                        label="Status"
                                                        name='status'
                                                    >
                                                        <MenuItem value="Approved">Approved</MenuItem>
                                                        <MenuItem value="Moderation">Moderation</MenuItem>
                                                        <MenuItem value="Cancelled">Rejected</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                
                                            </Form.Group>
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <Form.Group className="mb-3">
                                                <Textarea
                                                    placeholder="Type anything…" 
                                                    onChange={handleMerchantDetailChange}
                                                    name='business_msg'
                                                    value={formData.business_msg}
                                                    minRows={3}
                                                    />
                                            </Form.Group>
                                        </Grid>

                                        <Grid item xs={12} md={12} sx={{ maxWidth: '100%', marginBottom: '10px' }}>
                                            <TextField
                                                type="file"
                                                name="merchant_img"
                                                variant='standard'
                                                fullWidth
                                                onChange={handleMerchantDetailChange}
                                                InputProps={{
                                                style: {
                                                    paddingTop: '10px', 
                                                },
                                                }}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={12}>
                                            <div style={{maxWidth: '80px', maxHeight: '80px', overflow: 'hidden'}}>
                                                <img src={aboutMerchant?.logo} alt="Document" style={{maxWidth: '100%', height: 'auto'}}/>
                                            </div>
                                                <a href={aboutMerchant?.logo}>Click to view</a>
                                        </Grid>

                                        
                                    </Grid>

                                        <div className="d-flex justify-content-between">
                                            <Button variant="danger" onClick={handleCancelButtonClicked}>Cancel</Button>
                                            <Button variant="primary" onClick={handleFormSubmit}>Update</Button>
                                        </div>
                                        {error &&  <p className="text-danger">{error}</p>}
                                        {successMessage && <p className="text-success">{successMessage}</p>}

                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}

                {/* Remove this Component */}
                {/* {activeTab === 'transactions' && (
                    <MerchantPaymentTable headCells={MerchantPaymentTableHead} TableName={TransactionTableName} rows={DemoMerchantPaymentData} />
                )} */}
                
            </Container>
        </Main>

    );
};

export default MerchantProfile;
