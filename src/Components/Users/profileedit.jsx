import React, { useState, useMemo, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Nav, Form, } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Main, DrawerHeader } from "../Content"
import TransactionTable from './UsersTransactionTable';
import DisputeTable from './UserDisputesTable';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../Authentication/axios';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import WalletTable from './UserWalletsTable';
import MerchantBankAccountsTable from './Bank/MerchantBankTable';
import MerchantBankColumn from './Bank/Column';
import { MerchantBankAccountTableName } from './Bank/Column';
import { WalletTableColumns, DisputeTableColumn, WalletsTableName,
      DisputeTableName, PipetableName, PipeTableColumns
 } from './Columns';
 import UserPipeTable from './pipe/pipeTable';
 import MerchantKeys from './Keys/APIKeys';




// Edit Merchant Profile
const Profile = ({ open }) => {
    const navigate    = useNavigate();
    const location    = useLocation();
    const Kycdetails  = location.state?.kycID || '';
    const userDetails = location.state?.userID || '';

    const initialProfileData = {
        first_name:     Kycdetails?.firstname || '',
        last_name:      Kycdetails?.lastname || '',
        email:          Kycdetails?.email    || '',
        dob:            Kycdetails?.dateofbirth || '',
        zipcode:        Kycdetails?.zipcode  || '',
        status:         userDetails?.status || '',
        gender:         Kycdetails?.gander   || '',
        state:          Kycdetails?.state    || '',
        marital_status: Kycdetails?.marital_status || '',
        country:        Kycdetails?.country  || '',
        nationality:    Kycdetails?.nationality  || '',
        mobile_number:  Kycdetails?.phoneno      || '',
        id_type:        Kycdetails?.id_type      || '',
        address:        Kycdetails?.address      || '',
        id_number:      Kycdetails?.id_number    || '',
        landmark:       Kycdetails?.landmark     || '',
        id_expiry_date: Kycdetails?.id_expiry_date  || '',
        city:           Kycdetails?.city  || '',
    }

    const [activeTab, setActiveTab]     = useState('profile');
    const [showDeposit, setShowDeposit] = useState(false);
    const [show, setShow]               = useState(false);
    const [allGroup, updateAllGroup]    = useState([])
    const [error, setError]             = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [statusMessage, updateStatusMessage] = useState('');
    const [userWallet, updateUserWallet] = useState([])
    const [kycDetail, updateKycDetails] = useState(initialProfileData)

    const [groupValue, setGroupValue]   = useState(userDetails?.group_name || 'NA');
    const [statusValue, setStatusValue] = useState(userDetails?.status || 'NA');
    const [groupID, setGroupID]         = useState(userDetails?.group || 1);


    const handleClose = () => setShow(false);
    const handleShow  = () => setShow(true);

    const handleCloseDeposit = () => setShowDeposit(false);
    const handleShowDeposit  = () => setShowDeposit(true);

    
    const handleProfileChange = (event) => {
        
        updateKycDetails({...kycDetail,
            [event.target.name]: event.target.value,
        })
    };

    // console.log(groupID)

    const handleGroupValueChange = (event) => {

        const selectedGroupName   = event.target.value;
        const selectedGroup       = allGroup.find(group => group.name === selectedGroupName);

        setGroupValue(selectedGroup ? selectedGroup.name : 1)
        setGroupID(selectedGroup ? selectedGroup.id : 1)

    }

    const handleStatusValueUpdate = (event) => {
        setStatusValue(event.target.value)
    };

    const handleProfileStatusMessage = (event) => {
        const status_value = event.target.value

        if (status_value === 'Inactive') {
            updateStatusMessage('User will not be able to login')

        } else if (status_value === 'Suspended') {
            updateStatusMessage('User will be able to login but can not perform any Transactions')
        } 
        else if (status_value === 'Active') {
            updateStatusMessage('')
        }
    };


    // Fetch all Group from API
    useEffect(() => {
        axiosInstance.get(`api/all/groups/`).then((res)=> {
        // console.log(res.data.data)
        if (res.status === 200) {
            updateAllGroup(res.data.data)
        }
    }).catch((error)=> {
        // console.log(error)
        if (error.response.data.msg === 'Group fetch error') {
            setError('Unknow error Occured')
        } else if (error.response.data.msg === 'Server Error') {
            setError('Unknow error Occured')
        } else {
            setError('')
        };
    })
    }, [])


// Method to update user Kyc details
const handleKYCStatusUpdate = ()=> {
    // value = event.target.value;

    if (kycDetail.status === '') {
        setError('Please Select the status of the user')

    } else if (kycDetail.first_name === '') {
        setError('Please Fill up the First Name of the user')

    } else if (kycDetail.last_name === '') {
        setError("Please fill up the Last name")

    } else if (kycDetail.mobile_number === '') {
        setError("Please fill up the Mobile Number")

    } else if (kycDetail.email === '') {
        setError("Please fill up the Email ID")

    } else if (kycDetail.dob === '') {
        setError("Please fill up User DOB")

    } else if (kycDetail.gender === '') {
        setError("Please fill up User Gender")

    } else if (kycDetail.state === '') {
        setError("Please fill the state")

    } else if (kycDetail.marital_status === '') {
        setError("Please fill the Marital Status")
        
    } else if (kycDetail.country === '') {
        setError("Please fill the user's Country")

    } else if (kycDetail.id_type === '') {
        setError("Please fill the user's ID Type")

    } else if (kycDetail.id_number === '') {
        setError("Please fill the user's ID Number")

    } else if (kycDetail.id_expiry_date === '') {
        setError("Please fill the user's ID Expiry Date")

    } else if (kycDetail.address === '') {
        setError("Please fill the Address")

    } else if (kycDetail.city === '') {
        setError("Please fill the City")

    } else if (kycDetail.group === 0) {
        setError("Please Select user Group")

    } 
    // else if (kycDetail.password !== kycDetail.confirm_password) {
    //     setError("Password and Confirm password did not match")
    //  } 
     else {
        // setError('')
        // console.log(kycDetail.status)
        axiosInstance.put(`api/v1/admin/update/user/`, {
            user_id:          Kycdetails.user_id,
            first_name:       kycDetail.first_name,
            last_name:        kycDetail.last_name,
            phoneno:          kycDetail.mobile_number,
            email:            kycDetail.email,
            dob:              kycDetail.dob,
            gender:           Kycdetails.gander,
            state:            Kycdetails.state,
            city:             Kycdetails.city,
            landmark:         Kycdetails.landmark,
            address:          Kycdetails.address,
            status:           kycDetail.status,
            group:            groupID,

          }).then((res)=> {
            // console.log(res)
            if (res.status == 200) {
                setSuccessMessage('User Data updated Successfully')

                setTimeout(() => {
                    navigate('/admin/merchants/')
                }, 1000);
            }

          }).catch((error)=> {
            console.log(error.response)
      
          if (error.response.data.msg == 'Only Admin can update the Kyc'){
            setError("Only admin can view the Users kyc")
      
          } else if (error.response.data.msg == 'Unable to get Admin detail'){
              setError("Admin details not found")
      
          } else if (error.response.data.msg == 'Unable to locate kyc'){
              setError("Unknowc kyc error")
      
          } else if (error.response.data.msg == 'Error while fetching user detail'){
              setError("Unknow user detail error")
      
          } else if (error.response.data.msg == 'Error while updating KYC details'){
              setError("Unknow kyc update error")
      
          } else if (error.response.data.msg == 'Kyc not found'){
              setError("Kyc detail not found")
      
          } else if (error.response.data.msg == 'Error while updating the user'){
              setError("Unknown user error")
      
          } else if (error.response.data.msg == 'Server error'){
              setError("Server error")
              
          } else if (error.response.status == 401) {
              setError('Unauthorized Access')
          }
          else {
            setError("")
          }

          })
      };
    };

// Sample data for the table
const DisputeData = [];

// console.log(kycDetail.status)

useEffect(() => {
    if (error || successMessage) {
        const timer = setTimeout(() => {
            setError('');
            setSuccessMessage('');
        }, 3000); 

        return () => clearTimeout(timer);
    }
}, [error, successMessage]);



// Get all the Wallets related to the user
const handleUserWallets = () => {
    axiosInstance.post(`api/v2/admin/user/wallet/`, {
        user_id: Kycdetails.user_id,

      }).then((res) => {
        // console.log(res.data.user_wallet_data)
        const SortedWallet = res.data.user_wallet_data
        updateUserWallet(SortedWallet)

      }).catch((error)=> {
            console.log(error)
      })
};



if (Kycdetails === '') {
    
    return (
        <>
            <Main open={open}>
            <DrawerHeader />
                <h2>Please reverse the page and re edit again</h2>
                <p>OR <Link to={'/admin/merchants/'}>Click</Link> on the Link </p>
           </Main>

        </>
    )
};

if (userDetails === '') {
    
    return (
        <>
            <Main open={open}>
            <DrawerHeader />
                <h2>Please reverse the page and re edit again</h2>
                <p>OR <Link to={'/admin/merchants/'}>Click</Link> on the Link </p>
           </Main>

        </>
    )
};


    return (
        <>
        <Main open={open}>
            <DrawerHeader />

            {/* <Modal show={showDeposit} style={{margin:'10rem'}} onHide={handleCloseDeposit} backdrop="static" keyboard={false} >
                <Modal.Header closeButton>
                    <Modal.Title>Deposit</Modal.Title>
                </Modal.Header>
                <Card>
                   
                    <Card.Body>

                    <UserDeposit/>
                    </Card.Body>

                </Card>
            </Modal> */}

            {/* <Modal show={show} style={{margin:'10rem'}} onHide={handleClose} backdrop="static" keyboard={false} >
                <Modal.Header closeButton>
                    <Modal.Title>Withdraw</Modal.Title>
                </Modal.Header>
                <Card>
                   
                    <Card.Body>

                    <UserDeposit/>
                    </Card.Body>

                </Card>
            </Modal> */}

            <Container fluid>
                <Row className="my-3">
                    <Col>
                        <Nav variant="tabs" activeKey={activeTab} onSelect={setActiveTab}>

                            {/* Profile */}
                            <Nav.Item>
                                <Nav.Link eventKey="profile">Profile</Nav.Link>
                            </Nav.Item>

                            {/* Transactions */}
                            <Nav.Item>
                                <Nav.Link eventKey="transactions">Transactions</Nav.Link>
                            </Nav.Item>

                            {/* Wallets */}
                            <Nav.Item>
                                <Nav.Link eventKey="wallets" onClick={handleUserWallets}>Wallets</Nav.Link>
                            </Nav.Item>

                            {/* Bank Accounts */}
                            <Nav.Item>
                                <Nav.Link eventKey="accounts">Bank Accounts</Nav.Link>
                            </Nav.Item>

                            {/* Assign pipes */}
                            <Nav.Item>
                                <Nav.Link eventKey="pipes">Pipes</Nav.Link>
                            </Nav.Item>

                            {/* Tickets */}
                            <Nav.Item>
                                <Nav.Link eventKey="tickets">Keys</Nav.Link>
                            </Nav.Item>

                            {/* Disputes */}
                            {/* <Nav.Item>
                                <Nav.Link eventKey="disputes">Disputes</Nav.Link>
                            </Nav.Item> */}

                        </Nav>
                    </Col>
                </Row>
                {activeTab === 'profile' && (
                    // <></>
                    <Card className='shadow' style={{width: '100%'}}>
                        <Card.Body>
                            <Row>
                                <Col >
                                    <h3>{kycDetail ? Kycdetails.firstname : 'NA'} {kycDetail ? Kycdetails.lastname : 'NA'}</h3>
                                    {/* <div>
                                        <Button variant="primary" className="me-2" onClick={handleShowDeposit}>Deposit</Button>
                                        <Button variant="secondary" onClick={handleShow} >Withdraw</Button>
                                    </div> */}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                )}

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <Row>
                        <Col xs={12} className="mb-3">
                            <Card className='shadow'>
                                <Card.Body>
                                    <Form>
                                    <Grid container spacing={2} sx={{marginBottom: '10px'}}>

                                        <Grid item xs={12} md={4}>
                                            <Form.Group className="mb-3">
                                                <TextField 
                                                    label="First Name" 
                                                    name='first_name' 
                                                    value={kycDetail ? kycDetail.first_name : 'NA'} 
                                                    variant="outlined" 
                                                    fullWidth 
                                                    onChange={handleProfileChange} 
                                                    />
                                            </Form.Group>
                                        </Grid>
                                        
                                        <Grid item xs={12} md={4}>
                                            <Form.Group className="mb-3">
                                                <TextField label="Last Name" name='last_name' value={kycDetail ? kycDetail.last_name : 'NA'} variant="outlined"  fullWidth onChange={handleProfileChange} />
                                            </Form.Group>
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <Form.Group className="mb-3">
                                                <TextField
                                                    // country={'us'}
                                                    variant="outlined"
                                                    value={kycDetail.mobile_number}
                                                    label="Phone Number"
                                                    name='mobile_number'
                                                    onChange={handleProfileChange}
                                                    fullWidth
                                                />
                                            </Form.Group>
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <Form.Group className="mb-3">
                                                <TextField 
                                                     label="Email" 
                                                     variant="outlined" 
                                                     fullWidth 
                                                     type="email" 
                                                     name='email' 
                                                     value={kycDetail.email}
                                                     />
                                            </Form.Group>
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <Form.Group className="mb-3">
                                                <TextField 
                                                      label="DOB" 
                                                      name='dob' 
                                                      value={kycDetail ? kycDetail.dob : 'NA'} 
                                                      variant="outlined" 
                                                      fullWidth 
                                                      onChange={handleProfileChange} 
                                                      />
                                            </Form.Group>
                                        </Grid>
                                        
                                        <Grid item xs={12} md={4}>
                                            <Form.Group className="mb-3">
                                                <TextField 
                                                     label="Gender" 
                                                     name='gender' 
                                                     value={Kycdetails ? Kycdetails.gander : 'NA'} 
                                                     variant="outlined"  fullWidth onChange={handleProfileChange} 
                                                     />
                                            </Form.Group>
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <Form.Group className="mb-3">
                                                <TextField 
                                                      label="state" 
                                                      name='state' 
                                                      value={Kycdetails ? kycDetail.state : 'NA'} 
                                                      variant="outlined"  
                                                      fullWidth 
                                                      onChange={handleProfileChange} 
                                                      />
                                            </Form.Group>
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <Form.Group className="mb-3">
                                                <TextField 
                                                    label="city" 
                                                    name='city' 
                                                    value={Kycdetails ? kycDetail.city : 'NA'} 
                                                    variant="outlined"  
                                                    fullWidth 
                                                    onChange={handleProfileChange} 
                                                     />
                                            </Form.Group>
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <Form.Group className="mb-3">
                                                <TextField 
                                                    label="landmark" 
                                                    name='landmark' 
                                                    value={Kycdetails ? kycDetail.landmark : 'NA'} 
                                                    variant="outlined"  
                                                    fullWidth 
                                                    onChange={handleProfileChange} 
                                                    />
                                            </Form.Group>
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <Form.Group className="mb-3">
                                                <TextField 
                                                    label="address" 
                                                    name='address' 
                                                    value={Kycdetails ? kycDetail.address : 'NA'} 
                                                    variant="outlined"  
                                                    fullWidth 
                                                    onChange={handleProfileChange} 
                                                    />
                                            </Form.Group>
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <Form.Group className="mb-3">
                                                <TextField 
                                                    label="ID Type" 
                                                    name='id_type' 
                                                    value={Kycdetails ? Kycdetails.id_type : 'NA'} 
                                                    variant="outlined"  
                                                    fullWidth 
                                                    onChange={handleProfileChange} 
                                                    />
                                            </Form.Group>
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <Form.Group className="mb-3">
                                                <TextField 
                                                    label="ID Number" 
                                                    name='id_number' 
                                                    value={Kycdetails ? Kycdetails.id_number : 'NA'} 
                                                    variant="outlined"  
                                                    fullWidth 
                                                    onChange={handleProfileChange} 
                                                    />
                                            </Form.Group>
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <Form.Group className="mb-3">
                                                <TextField 
                                                     label="ID Expiry Date" 
                                                     name='id_expiry_date' 
                                                     value={Kycdetails ? Kycdetails.id_expiry_date : 'NA'} 
                                                     variant="outlined"  
                                                     fullWidth 
                                                     onChange={handleProfileChange} 
                                                />
                                            </Form.Group>
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <Form.Group className="mb-3">
                                                <FormControl fullWidth variant="outlined">
                                                    <InputLabel>Group</InputLabel>
                        
                                                    <Select
                                                        value={groupValue}
                                                        onChange={(event)=> {handleProfileChange(event), handleGroupValueChange(event)}}
                                                        label="Group"
                                                        // name='group'
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
                                                        onChange={(event) => {handleProfileChange(event); handleProfileStatusMessage(event); handleStatusValueUpdate(event);}}
                                                        label="Status"
                                                        name='status'
                                                        // onClick={handleProfileStatusMessage}
                                                    >
                                                        <MenuItem value="Active">Active</MenuItem>
                                                        <MenuItem value="Inactive">Inactive</MenuItem>
                                                        <MenuItem value="Suspended">Suspended</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                {statusMessage && <p className="text-danger">{statusMessage}</p>}
                                            </Form.Group>
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <div style={{maxWidth: '150px', maxHeight: '200px', overflow: 'hidden'}}>
                                                <img src={userDetails ? userDetails.document : 'NA'} alt="Document" style={{maxWidth: '100%', height: 'auto'}}/>
                                            </div>
                                                <a href={userDetails ? userDetails.document : 'NA'}> Click to view</a>
                                        </Grid>
                                    </Grid>

                                        <div className="d-flex justify-content-between">
                                            <Button variant="danger">Cancel</Button>
                                            <Button variant="primary" onClick={handleKYCStatusUpdate}>Update</Button>
                                        </div>
                                        {error &&  <p className="text-danger">{error}</p>}
                                        {successMessage && <p className="text-success">{successMessage}</p>}

                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}

                {activeTab === 'wallets' && (
                    <WalletTable 
                        headCells={WalletTableColumns} 
                        TableName={WalletsTableName} 
                        rows={userWallet} 
                        />

                )}
                {activeTab === 'tickets' && (
                    <MerchantKeys
                      merchantID={Kycdetails.user_id}
                    />
                   
                )}
                {activeTab === 'transactions' && (
                    
                    <TransactionTable  
                        userID={Kycdetails.user_id} 
                    />
                )}
                {activeTab === 'disputes' && (
                    <DisputeTable headCells={DisputeTableColumn} TableName={DisputeTableName} rows={DisputeData} />
                )}

                {activeTab === 'pipes' && (
                    <UserPipeTable 
                           headCells={PipeTableColumns} 
                           TableName={PipetableName} 
                           rows={DisputeData} 
                           userID={Kycdetails.user_id}
                           />
                )}

                {activeTab === 'accounts' && (
                    <MerchantBankAccountsTable 
                              headCells={MerchantBankColumn} 
                              TableName={MerchantBankAccountTableName} 
                              rows={DisputeData} 
                              userID={Kycdetails.user_id}
                              />
                )}

            </Container>
        </Main>

        </>
    );
};

export default Profile;
