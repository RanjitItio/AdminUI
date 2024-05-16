// import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react';
import axiosInstance from './axios';
import { Link, useNavigate } from 'react-router-dom';
import './tailwind.css';
import { RiUser3Line } from "react-icons/ri";



function Signin(){
    const navigate =  useNavigate();

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
                        navigate('/')
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

    <div className="min-h-screen flex bg-blue-300">
        {/* First flex container with a blue color palette */}
        <div className="flex-[50%] bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex items-center justify-center">
        <img src="https://script.viserlab.com/paymenthub/assets/images/frontend/login_register/641872cda99f91679323853.png" alt="Logo" className="h-80 w-80 drop-shadow-2xl " />
        
      
        </div>
  
        {/* Second flex container with a green color palette */}
        <div className="flex-[80%] bg-white-200 flex items-center justify-center  bg-white  ">
          <div className="max-w-md w-full space-y-8">
          <div className="col-span-1 shadow-2xl p-4 rounded-md">
            <div className='col-span-1  rounded-full'>
              <center>
            <p className='text-7xl' ><RiUser3Line/>  </p>
            <h2 className="text-2xl font-semibold mb-4 "> Login </h2>
              </center>
            </div>
          
          <form className="space-y-4 ">
          <div className="grid grid-cols-1 gap-x-4 gap-y-2">

            <div>
              <label className="block text-gray-600 font-medium">Email</label>
              <input
                type="email"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Email"
                name="email"
                onChange={handleChange} 
              />
            </div>

            

            <div>
              <label className="block text-gray-600 font-medium">Password</label>
              <input
                type="password"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="********"
                name='password'
                onChange={handleChange}
              />
            </div>

          </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleOnSubmit}
            >
              Submit
            </button>

                {error &&  <p className="text-danger">{error}</p>}
                {successMessage && <p className="text-success">{successMessage}</p>}
          </form>
          <div className='cols col-span-1 flex justify-between items-center'>

          <p className='font-extralight'>If you don't have any account <Link to={'/signup/'}>  Signup</Link></p>
          <p className='font-extralight'> <Link to={'/forgot-password/'}> Forget password</Link></p>
          </div>
        </div>
            
          </div>        
        </div>
      </div>

        
    </>
   );
};



export default Signin;