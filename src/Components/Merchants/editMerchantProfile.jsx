import { Row, Col, Card, Button, Form, } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Grid } from '@mui/material';
import axiosInstance from '../Authentication/axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';





// Edit user profile
export default function UpdateMerchantProfile({allGroup, groupValue, handleGroupValueChange, userDetails}) {

    const initialFormData = {
        first_name: userDetails?.firstname || '',
        last_name:  userDetails?.lastname  || '',
        contact_number: userDetails?.phoneno || '',
        email: userDetails?.email || '',
    };

    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');  // Success message state
    const [errorMessage, setErrorMessage]     = useState('') // Error Message
    const [formData, updateFormData] = useState(initialFormData);  // Form values state


    // Method to get input data
    const handleEditInputChange = (e)=> {
        const {name, value} = e.target;

        updateFormData({
            ...formData,
            [name]: value
        })
    };


    // Method to update user profile
    const handleUserProfileUpdate = ()=>  {
        const groupName = allGroup.find((grp)=> grp.name === groupValue);
        const groupID   = groupName?.id

        axiosInstance.put(`api/v1/admin/update/user/profile/`, {
            user_id: parseInt(userDetails.user_id),
            first_name: formData.first_name,
            last_name:  formData.last_name,
            contact_number: formData.contact_number,
            email: formData.email,
            group: groupID

        }).then((res)=> {
            console.log(res);

            if (res.status === 200 && res.data.success === true) {
                setSuccessMessage('Updated Successfully')

                setTimeout(() => {
                    navigate('/admin/merchants/')
                }, 1000);  
            }

        }).catch((error)=> {
            console.log(error)

            if (error.response.data.message == 'Mail ID already exists') {
                setErrorMessage('Email ID already exists');
            } else if (error.response.data.message == 'Contact number already exists') {
                setErrorMessage('Contact number already exists')
            } else {
                setErrorMessage('')
            }
        })
    };



    return (
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
                                    value={formData?.first_name || ''} 
                                    onChange={handleEditInputChange}
                                    variant="outlined" 
                                    fullWidth  
                                    />
                            </Form.Group>
                        </Grid>
                        
                        <Grid item xs={12} md={4}>
                            <Form.Group className="mb-3">
                                <TextField 
                                    label="Last Name" 
                                    name='last_name' 
                                    value={formData?.last_name || ''} 
                                    variant="outlined"  
                                    fullWidth 
                                    onChange={handleEditInputChange} 
                                    />
                            </Form.Group>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Form.Group className="mb-3">
                                <TextField
                                    variant="outlined"
                                    value={formData?.contact_number || ''}
                                    label="Phone Number"
                                    name='contact_number'
                                    onChange={handleEditInputChange}
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
                                     value={formData?.email || ''}
                                     onChange={handleEditInputChange}
                                     />
                            </Form.Group>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Form.Group className="mb-3">
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Group</InputLabel>

                                    <Select
                                        value={groupValue}
                                        onChange={(event)=> {handleGroupValueChange(event); }}
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

                        <Grid item xs={12}>
                            <div style={{maxWidth: '150px', maxHeight: '200px', overflow: 'hidden'}}>
                                <img src={userDetails ? userDetails.document : 'NA'} alt="Document" style={{maxWidth: '100%', height: 'auto'}}/>
                            </div>
                                <a href={userDetails ? userDetails.document : 'NA'}> Click to view</a>
                        </Grid>
                    </Grid>


                        <div style={{display:'flex', justifyContent: 'center', gap:'20px'}}>
                            <Button variant="danger">Cancel</Button>
                            <Button 
                                variant="primary" 
                                onClick={handleUserProfileUpdate}
                                >
                                Update
                            </Button>
                        </div>
                        {errorMessage &&  <p className="text-danger d-flex justify-content-center my-2">{errorMessage}</p>}
                        {successMessage && <p className="text-success d-flex justify-content-center my-2">{successMessage}</p>}

                    </Form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
    );
};