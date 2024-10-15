import React, { useState, useMemo, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Nav, Form, } from 'react-bootstrap';
import { Main, DrawerHeader } from "../../Components/Content";
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../Components/Authentication/axios';
import Alert from '@mui/material/Alert';
import UpdateCryptoUserProfile from './UpdateUser';
import UdateCrptoUsersKyc from './UpdateUserKyc';
import UserWalletTable from './UserWallets';
import { WalletTableColumns } from './Columns/Columns';
import { WalletsTableName } from './Columns/Columns';
import UserBankAccountsTable from './UserBankAccounts';
import FiatTransactionTable from '../UserTransactions/UserFiatTransactions';




// user edit tabs
export default function UserTabs({open}) {
    const location    = useLocation();
    const navigate    = useNavigate();

    const userDetails = location.state?.userID || '';  // Data from table
    const Kycdetails  = location.state?.kycID || '';   // data from table
    
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
    };

    const [activeTab, setActiveTab]     = useState('profile');
    const [allGroup, updateAllGroup]    = useState([]);  // Group data 
    const [groupValue, setGroupValue]   = useState(userDetails?.group_name || 'NA');
    const [kycDetail, updateKycDetail]  = useState(initialProfileData); // Kyc data
    const [statusMessage, updateStatusMessage] = useState('');  // Status Message
    const [error, setError]             = useState('')   // Error message
    const [successMessage, setSuccessMessage] = useState(''); // Success Message
    const [statusValue, setStatusValue] = useState(userDetails?.status || 'NA');
    const [disableKycUpdateButton, setDisableKycUpdateButton] = useState(false); 
    const [userWallet, updateUserWallet] = useState([]);        // Wallet 
    const [groupID, setGroupID]         = useState(userDetails?.group || 1);



    // Update Profile data
    const handleProfileChange = (event) => {
        updateKycDetail({...kycDetail,
            [event.target.name]: event.target.value,
        })
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
        }, []);


    // Selected Group value
    const handleGroupValueChange = (event) => {

        const selectedGroupName   = event.target.value;
        const selectedGroup       = allGroup.find(group => group.name === selectedGroupName);

        setGroupValue(selectedGroup ? selectedGroup.name : 1)
        setGroupID(selectedGroup ? selectedGroup.id : 1)

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

    // Selecetd Status
    const handleStatusValueUpdate = (event) => {
        setStatusValue(event.target.value)
    };

    
// Method to update user Kyc details
const handleKYCStatusUpdate = ()=> {

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
        setDisableKycUpdateButton(true);

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
                    navigate('/admin/users/data/')
                }, 1000);
            }

          }).catch((error)=> {
            console.log(error.response)
      
          if (error.response.data.msg == 'Unable to locate kyc'){
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


    return (
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
                                <Nav.Link eventKey="wallets" onClick={handleUserWallets}>
                                    Wallets
                                </Nav.Link>
                            </Nav.Item>

                            {/* Bank Accounts */}
                            <Nav.Item>
                                <Nav.Link eventKey="accounts">Bank Accounts</Nav.Link>
                            </Nav.Item>

                            {/* Disputes */}
                            <Nav.Item>
                                <Nav.Link eventKey="disputes">Disputes</Nav.Link>
                            </Nav.Item>

                        </Nav>
                    </Col>
                </Row>

                {/* User Profile tab */}
                {activeTab === 'profile' && (
                    <UpdateCryptoUserProfile 
                        allGroup={allGroup}  
                        groupValue={groupValue}
                        handleGroupValueChange={handleGroupValueChange}
                        userDetails={userDetails}
                    />
                )}

                {/* KYC Tab */}
                {activeTab === 'kyc' && (
                    Kycdetails ? 
                        <UdateCrptoUsersKyc 
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
                    <UserWalletTable 
                        headCells={WalletTableColumns} 
                        TableName={WalletsTableName} 
                        rows={userWallet} 
                        />

                )}
               
                {activeTab === 'transactions' && (
                    <FiatTransactionTable  
                        userID={Kycdetails.user_id} 
                    />
                )}
                {activeTab === 'disputes' && (
                    <></>
                    // <DisputeTable 
                    //     headCells={DisputeTableColumn} 
                    //     TableName={DisputeTableName} 
                    //     rows={DisputeData} 
                    //     />
                )}

                {activeTab === 'accounts' && (
                    <UserBankAccountsTable 
                              userID={Kycdetails?.user_id}
                            />
                )}

            </Container>
        </Main>
    );
};