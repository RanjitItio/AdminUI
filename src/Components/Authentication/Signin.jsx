import React, { useState } from 'react';
import axiosInstance from './axios';
import './tailwind.css';
// import { RiUser3Line } from "react-icons/ri";
import { Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Row, Col, Button } from 'react-bootstrap';

function Signin(){
    // const navigate =  useNavigate();

    const initialFormData = Object.freeze({
		email: '',
		password: '',
	});

    const [formData, updateFormData] = useState(initialFormData);
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('');


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
                    setSuccessMessage(`Login Successfull`)
                    setTimeout(() => {
                        window.location.href = '/'
                    }, 1000);

                    localStorage.setItem('access_token', res.data.access_token);
                    localStorage.setItem('refresh_token', res.data.access_token);

                    axiosInstance.defaults.headers['Authorization'] =
                      'Bearer ' + localStorage.getItem('access_token');
                    // console.log(res);
                    // console.log(res.data);
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
    }

   return(
    <>

<Card className=" mt-5 shadow" style={{maxWidth: '20rem', margin: '0 auto'}}>
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
                </Form>
                {/* Message */}
                {error &&  <p className="text-danger">{error}</p>}
                {successMessage && <p className="text-success">{successMessage}</p>}
            </Card.Body>
        </Card>
        
    </>
   );
};



export default Signin;