import React, { useState } from 'react';
import axiosInstance from './axios';
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";


function Signin(){
    // const navigate =  useNavigate();

    const initialFormData = Object.freeze({
		email: '',
		password: '',
	});

    const [formData, updateFormData] = useState(initialFormData);
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('');
    const [disableButton, setDisableButton]   = useState(false);


    const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};

    const handleOnSubmit = async (e)=> {
        e.preventDefault();
        let validationError = [];
		// console.log(formData);
        // console.log(e)

        if (!formData.email) {
            validationError.push("Please fill the Email");
        }
        else if (!formData.password) {
            validationError.push("Please fill the password");
        }

        if (validationError.length > 0) {
            setError(validationError.join(''));
            return;
        } else{
            setError('');
        }

        await axiosInstance.post(`api/v1/admin/login/`, {
				email:    formData.email,
				password: formData.password,
			})
			.then((res) => {
                if(res.status == 200) {
                    setDisableButton(true);
                    setSuccessMessage(`Login Successfull`)

                    setTimeout(() => {
                        window.location.href = '/'
                    }, 1000);

                    localStorage.setItem('access_token', res.data.access_token);
                    localStorage.setItem('refresh_token', res.data.access_token);

                    axiosInstance.defaults.headers['Authorization'] =
                      'Bearer ' + localStorage.getItem('access_token');
                }

            //  localStorage.clear();
			}).catch((error)=> {
                // console.log(error.response.data.msg)
                if (error.response.data.msg == 'User is not available'){
                    setError("User does not exist");

                } else if (error.response.data.msg == 'Unable to get the user'){
                    setError("Unable to locate the user"); 

                } else if (error.response.data.msg == 'Please provide admin credentials'){
                    setError('Admin user only')

                } else if (error.response.data.msg == 'Invalid credentials') {
                    setError("Invalid Credential")
                };

            })
        };


   return(
    <>
        <Box sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(135deg, #7b67d2, #8f44e8)",
        }}>
        <Box sx={{
            width: 300,
            padding: "40px",
            borderRadius: "12px",
            backgroundColor: "#fff",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            position: "relative",
            textAlign: "center",
            }}>

            {/* Main Form */}
            <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#4B0082", mb: 3 }}
            >
                Login Form
            </Typography>

            {/* Input Fields */}
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                name="email"
                onChange={handleChange}
                />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                name='password'
                onChange={handleChange}
                />

            {/* Login Button */}
            <Button
            variant="contained"
            disabled={disableButton}
            fullWidth
            onClick={handleOnSubmit}
            sx={{
                backgroundColor: "#4B0082",
                padding: "10px",
                borderRadius: "20px",
                "&:hover": { backgroundColor: "#6A0DAD" },
            }}>
                LOG IN NOW
            </Button>

            {error &&  <p className="text-danger">{error}</p>}
            {successMessage && <p className="text-success">{successMessage}</p>}

            {/* Social Login */}
            <Typography
            variant="body2"
            sx={{ color: "#808080", marginTop: "20px" }}>
                Log in via
            </Typography>

            <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                <IconButton color="primary">
                    <Facebook />
                </IconButton>

                <IconButton color="primary">
                    <Twitter />
                </IconButton>

                <IconButton color="primary">
                    <Instagram />
                </IconButton>
            </Box>
        </Box>
        </Box>
        {/* <Card className=" mt-5 shadow" style={{maxWidth: '20rem', margin: '0 auto'}}>
            <Card.Body>
                <h2 className="text-center m-4">SignIn </h2>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"  name='password' onChange={handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100"  onClick={handleOnSubmit}>Submit</Button>
                    
                {error &&  <p className="text-danger">{error}</p>}
                {successMessage && <p className="text-success">{successMessage}</p>}
                </Form>
            </Card.Body>
        </Card> */}
        
    </>
   );
};



export default Signin;