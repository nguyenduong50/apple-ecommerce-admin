import axios from "axios";
import { API_ROOT } from "~/utils/const";

export const loginAPI = async(email, password) => {
  const response = await axios.post(
    `${API_ROOT}/v1/auth/login`, 
    { email, password},
    {withCredentials: 'include'}
  )
  return response.data
}

export const logoutAPI = async() => {
  const response = await axios.get(
    `${API_ROOT}/v1/auth/logout`, 
    {
      withCredentials: 'include'
    }
  )

  localStorage.removeItem('accessToken');
  localStorage.removeItem('currentUser');
  localStorage.removeItem('expiration');

  return response.data;
}