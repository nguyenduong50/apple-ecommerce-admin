import axios from "axios";
import { API_ROOT } from "~/utils/const";

export const fetchUserAPI = async() => {
  const response = await axios.get(`${API_ROOT}/v1/user`, {withCredentials: 'include'})
  return response.data
}

export const fetchUserCustomerAPI = async() => {
  const response = await axios.get(`${API_ROOT}/v1/home`, {withCredentials: 'include'})
  return response.data
}