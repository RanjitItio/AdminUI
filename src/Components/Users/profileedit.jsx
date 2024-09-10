import React, { useState, useMemo, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Nav, Form, } from 'react-bootstrap';
import { Main, DrawerHeader } from "../Content"
import TransactionTable from './UsersTransactionTable';
import DisputeTable from './UserDisputesTable';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../Authentication/axios';
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
 import UpdateMerchantKyc from '../Merchants/editMerchantKyc';
 import UpdateMerchantProfile from '../Merchants/editMerchantProfile';
 import Alert from '@mui/material/Alert';




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
    const [allGroup, updateAllGroup]    = useState([]);  // Group data 
    const [error, setError]             = useState('')   // Error message
    const [successMessage, setSuccessMessage] = useState(''); // Success Message
    const [statusMessage, updateStatusMessage] = useState('');  // Status Message
    const [userWallet, updateUserWallet] = useState([]);        // Wallet 
    const [kycDetail, updateKycDetails] = useState(initialProfileData); // Kyc data

    const [groupValue, setGroupValue]   = useState(userDetails?.group_name || 'NA');
    const [statusValue, setStatusValue] = useState(userDetails?.status || 'NA');
    const [groupID, setGroupID]         = useState(userDetails?.group || 1);
    const [disableKycUpdateButton, setDisableKycUpdateButton] = useState(false); 

    
    // Update Profile data
    const handleProfileChange = (event) => {
        updateKycDetails({...kycDetail,
            [event.target.name]: event.target.value,
        })
    };

    // Selected Group value
    const handleGroupValueChange = (event) => {

        const selectedGroupName   = event.target.value;
        const selectedGroup       = allGroup.find(group => group.name === selectedGroupName);

        setGroupValue(selectedGroup ? selectedGroup.name : 1)
        setGroupID(selectedGroup ? selectedGroup.id : 1)

    };

    // Selecetd Status
    const handleStatusValueUpdate = (event) => {
        setStatusValue(event.target.value)
    };

     // Show message according to the status
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

    setDisableKycUpdateButton(true);

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

    } else {
        setError('')
        
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
                setDisableKycUpdateButton(false);

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
              setDisableKycUpdateButton(false);
      
          } else if (error.response.data.msg == 'Error while updating the user'){
              setError("Unknown user error")
      
          } else {
            setError("")

          }})
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



if (userDetails === '') {
    
    return (
        <>
            <Main open={open}>
            <DrawerHeader />
                <h2>User details not found</h2>
           </Main>
        </>
    )
};


    return (
        <>
        <Main open={open}>
            <DrawerHeader />

            <Container fluid>
                <Row className="my-3">
                    <Col>
                        <Nav variant="tabs" activeKey={activeTab} onSelect={setActiveTab}>

                            {/* Profile */}
                            <Nav.Item>
                                <Nav.Link eventKey="profile">Profile</Nav.Link>
                            </Nav.Item>

                            {/* Profile */}
                            <Nav.Item>
                                <Nav.Link eventKey="kyc">KYC Data</Nav.Link>
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

                {/* User Profile tab */}
                {activeTab === 'profile' && (
                    <UpdateMerchantProfile 
                        allGroup={allGroup}
                        groupValue={groupValue}
                        handleGroupValueChange={handleGroupValueChange}
                        userDetails={userDetails}
                    />
                )}

                {/* KYC Tab */}
                {activeTab === 'kyc' && (
                    Kycdetails ? 
                        <UpdateMerchantKyc 
                            kycDetail={kycDetail}
                            Kycdetails={Kycdetails}
                            handleProfileChange={handleProfileChange}
                            allGroup={allGroup}
                            groupValue={groupValue}
                            handleProfileStatusMessage={handleProfileStatusMessage}
                            handleStatusValueUpdate={handleStatusValueUpdate}
                            statusMessage={statusMessage}
                            error={error}
                            successMessage={successMessage}
                            handleKYCStatusUpdate={handleKYCStatusUpdate}
                            statusValue={statusValue}
                            userDetails={userDetails}
                            handleGroupValueChange={handleGroupValueChange}
                            disableKycUpdateButton={disableKycUpdateButton}
                        />  
                        :
                        <Alert variant="filled" severity="info">
                            KYC has not filled by the user.
                        </Alert>
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
