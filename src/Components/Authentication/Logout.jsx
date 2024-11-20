import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axiosInstance from "./axios";



export default function Logout(){
    const navigate = useNavigate();

    useEffect(() => {
		// const response = axiosInstance.post('user/logout/blacklist/', {
		// 	refresh_token: localStorage.getItem('refresh_token'),
		// });

		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		localStorage.removeItem('token');
		axiosInstance.defaults.headers['Authorization'] = null;
		navigate('/signin/');
	}, []);

    return(
        <>
           <p className="text-success my-5">You have been Logged out Successfully</p>
           <Link to={'/signin/'} className="text-center">Please Login</Link>
        </>
    );
};

