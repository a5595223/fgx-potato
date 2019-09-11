import axios from 'axios'
import history from './history'

const AppId = 'pBgCe1AA8FX5Vg9Eq5DQ5XfJ'
const AppSecret = 'MgYFFRaTVEp4FadrHV3dbckB'

const instance = axios.create({
    baseURL: 'https://gp-server.hunger-valley.com/',
    headers: {
        't-app-id': AppId,
        't-app-secret': AppSecret
    }
});

// Add a request interceptor
instance.interceptors.request.use((config) => {
    const xToken = localStorage.getItem('x-token')
    if (xToken) {
        config.headers['Authorization'] = `Bearer ${xToken}`
    }
    return config;
}, (error) => {
    console.error(error)
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use((response) => {
    // Do something with response data
    if (response.headers['x-token']) {
        localStorage.setItem('x-token', response.headers['x-token'])
    }
    return response;
}, (error) => {
    if (error.response.status === 401) {
        console.log("重定向");
        history.push('/login')
    }
    // Do something with response error
    return Promise.reject(error);
});

/* tslint:enable:no-string-literal */
export default instance