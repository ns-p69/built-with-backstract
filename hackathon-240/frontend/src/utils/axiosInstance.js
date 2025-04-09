// utils/axiosInstance.js
import axios from 'axios';
import { API_CONFIG } from '@/constants';

const axiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

export default axiosInstance;