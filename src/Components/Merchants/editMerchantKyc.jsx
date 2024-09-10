import { Row, Col, Card, Button, Form, } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Grid } from '@mui/material';




// Update Merchant KYC Data
export default function UpdateMerchantKyc({kycDetail, Kycdetails, userDetails, groupValue, 
                                            statusValue, handleProfileChange, allGroup, disableKycUpdateButton,
                                            handleProfileStatusMessage, handleStatusValueUpdate, statusMessage, 
                                            handleKYCStatusUpdate, error, successMessage, handleGroupValueChange}) {

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
                                        disabled
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
                            <Button 
                                variant="primary" 
                                onClick={handleKYCStatusUpdate}
                                disabled={disableKycUpdateButton}
                                >
                                    Update
                            </Button>
                        </div>
                        {error &&  <p className="text-danger">{error}</p>}
                        {successMessage && <p className="text-success">{successMessage}</p>}

                    </Form>
                </Card.Body>
            </Card>
        </Col>
    </Row>
    );
};