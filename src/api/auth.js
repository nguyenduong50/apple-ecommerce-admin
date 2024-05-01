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
  localStorage.removeItem('currentRoom');

  document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;domain=localhost:3001;'
  document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;domain=localhost:3001;'

  return response.data;
}