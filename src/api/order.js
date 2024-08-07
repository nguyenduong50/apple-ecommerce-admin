import axios from "axios";
import { API_ROOT } from "~/utils/const";

export const fetchOrderAPI = async() => {
  const response = await axios.get(`${API_ROOT}/v1/order`, {withCredentials: 'include'})
  return response.data
}

export const fetchOrderDetailAPI = async(orderId) => {
  const response = await axios.get(`${API_ROOT}/v1/order/${orderId}`, {withCredentials: 'include'})
  return response.data
}