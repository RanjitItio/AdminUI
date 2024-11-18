import { useState } from 'react';
import axiosInstance from './axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { RiUser3Line } from "react-icons/ri";
import './tailwind.css';




// User Signup
function Signup() {
    const navigate = useNavigate();

    const initialFormData = Object.freeze({
		first_name: '',
    last_name: '',
    contact_number: '',
		email: '',
		password: '',
		confirm_password: '',
	});
    
    const [formData, updateFormData] = useState(initialFormData);
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('');


    const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};

    const filteredFormData = Object.fromEntries(
        Object.entries(formData).filter(([key]) => key !== 'password' && key !== 'confirm_password')
      );

    const handleSubmit = async (e) => {
        e.preventDefault();
        let validationError = [];
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
		// console.log(formData);

        if (!formData.email) {
            validationError.push("Please fill your Email Address");
        }
        else if (!formData.last_name) {
            validationError.push("Please fill your Last Name");
        }
        else if (!formData.first_name) {
            validationError.push("Please fill your First Name");
        }
        else if (!formData.contact_number) {
            validationError.push("Please fill the contact number");
        }
        else if (formData.contact_number.length < 10) {
            validationError.push("Mobile number must contain 10 digits");   
        }
        else if (!formData.password) {
            validationError.push("Please fillup the password");
        }
        else if (formData.password.length < 10) {
            validationError.push("Password must contain at least 10 characters");
        }
        // else if (!passwordRegex.test(formData.password)) {
        //     validationError.push("Password must contain at least 10 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character.");
        // }
        else if (!formData.confirm_password) {
            validationError.push("Please fillup the confirm password");
        }
        else if (formData.password !== formData.confirm_password) {
            validationError.push("Password did not match please correct the password");
        }

        if (validationError.length > 0) {
            setError(validationError.join(''));
            return;
        } else{
            setError(''); 
        }

      await axiosInstance.post(`api/v1/admin/register/`, {
            // firstname:        formData.first_name,
            // lastname:         formData.last_name,
            // phone_no:         formData.contact_number,
            // email:            formData.email,
            // password:         formData.password,
            // confirm_password: formData.confirm_password,
            // is_merchent: true
        })
        .then((res) => {
            // console.log(res.data)
            if(res.status == 201) {
                setSuccessMessage(`Dear ${formData.first_name} ${formData.last_name} you have been Registered Successfully`)
            
                setTimeout(() => {
                    navigate(`/signin/`);
                }, 2000);
            }
        }).catch((error) => {
            if (error.response.status == 400) {
                setError(error.response.data.msg)
            }
            else if (error.response.data.msg == 'Password did not match') {
                setError('Password did not match please try again')
            }
            else {
                setError('')
            }
        });

	};



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
            <p className='text-7xl'><RiUser3Line/>  </p>
            <h2 className="text-2xl font-semibold mb-4 "> Sign Up</h2>
              </center>
            </div>
          
          <form className="space-y-4 ">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">

            <div>
              <label className="block text-gray-600 font-medium ">First Name</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="First Name"
                name='first_name'
                onChange={handleChange} 
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium">Last Name</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Last Name"
                name='last_name'
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium">Email</label>
              <input
                type="email"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Email"
                name='email'
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium">Phone No</label>
              <input
                type="text"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Phone No"
                name='contact_number'
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

            <div>
              <label className="block text-gray-600 font-medium">Confirm Password</label>
              <input
                type="password"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="********"
                name='confirm_password'
                onChange={handleChange}
              />
            </div>

          </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Sign Up
            </button>

            {error &&  <p className="text-danger">{error}</p>}
            {successMessage && <p className="text-success">{successMessage}</p>}

          </form>

          <div className='cols col-span-1 flex justify-between items-center'>

          <p className='font-extralight'>If you already have any account <Link to={'/signin/'}>  LOGIN</Link></p>
          <p className='font-extralight'> <Link to={'/forgot-password/'}> Forget password</Link></p>
          </div>
        </div>

          </div>        
        </div>
      </div>

          
        </>
    );
};



export default Signup;

