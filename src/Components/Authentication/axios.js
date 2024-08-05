import axios from 'axios';


const IS_DEVELOPMENT = import.meta.env.VITE_IS_DEVELOPMENT;
let baseURL = '';


if (IS_DEVELOPMENT === 'True') {
   baseURL = 'http://127.0.0.1:8000/'
} else {
    baseURL = 'https://python-uat.oyefin.com/'
}




const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 20000,
    headers: {
        Authorization: localStorage.getItem('access_token')
            ? 'Bearer ' + localStorage.getItem('access_token')
            : null,
        "Content-Type": "application/json",
        Accept: 'application/json',
    }
});


// Redirect to home page after authentication timeout
axiosInstance.interceptors.response.use(
    (res) => {
        return res
    },

    async function (error) {
        // const originalRequest = error.config;

        if (error.response) {
            if (error.response.statusText === 'Unauthorized') {
                window.location.href = '/signin/';
            }
            return Promise.reject(error);
        } else {
            console.error('Network Error or other issue:', error);
            return Promise.reject(error);
        }
    }
);




export default axiosInstance;

