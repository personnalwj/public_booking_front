import axios, { AxiosInstance } from 'axios';
import { appInfo } from '../config/appInfo';

const apiClient: AxiosInstance = axios.create({
    baseURL: `${appInfo.apiDomain}${appInfo.apiBasePath}`, // Replace with your base URL
    timeout: 5000, // Set your desired timeout
    headers: {
        'Content-Type': 'application/json', // Set your desired headers
    },
});

export default apiClient;