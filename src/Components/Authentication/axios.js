import axios from 'axios';



const baseURL = 'https://python-uat.oyefin.com/'
// const baseURL = 'http://127.0.0.1:8000/'




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



axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;

		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
					'Looks like CORS might be the problem. ' +
					'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

		if (
			error.response.status === 400 &&
			originalRequest.url === baseURL + 'api/v1/token/'
		) {
			window.location.href = '/signin/';
			return Promise.reject(error);
		}

		if (
			error.response.data.msg === 'token_not_valid' &&
			error.response.status === 400 &&
			error.response.statusText === 'Unauthorized' && 
			error.response.msg === 'Invalid token' 
		) {
			const refreshToken = localStorage.getItem('refresh_token');

			if (refreshToken) {
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

				// exp date in token is expressed in seconds, while now() returns milliseconds:
				const now = Math.ceil(Date.now() / 1000);
				console.log(tokenParts.exp);

				if (tokenParts.exp > now) {
					return axiosInstance
						.post('/api/v1/token/', { refresh_token: refreshToken })
						.then((response) => {
							localStorage.setItem('access_token', response.data.access);
							localStorage.setItem('refresh_token', response.data.refresh);

							axiosInstance.defaults.headers['Authorization'] =
								'Bearer ' + response.data.access_token;
							originalRequest.headers['Authorization'] =
								'Bearer ' + response.data.access_token;

							return axiosInstance(originalRequest);
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					console.log('Refresh token is expired', tokenParts.exp, now);
					window.location.href = '/signin/';
				}
			} else {
				console.log('Refresh token not available.');
				window.location.href = '/signin/';
			}
		}

		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);




export default axiosInstance;

