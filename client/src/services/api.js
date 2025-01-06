import axios from 'axios';

const API_URL = "http://localhost:8000";

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response;
};


export const signup = async (email, password, name) => {
    const response = await axios.post(`${API_URL}/auth/signup`, { email, password, full_name: name });
    return response;
};


export const getAllActivUsers = async () => {
    const response = await axios.get(`${API_URL}/chat/getAllUsers`);
    return response;
};