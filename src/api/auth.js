import axios from "axios";
import { API_ROOT } from "~/utils/const";

export const loginAPI = async(username, password) => {
  const response = await axios.post(
    `${API_ROOT}/v1/auth/login`, 
    { username, password},
    {withCredentials: 'include'}
  )
  return response.data
}