import axios from "axios";
import { API_ROOT } from "~/utils/const";

export const fetchCsrfProductAPI = async() => {
  const response = await axios.get(`${API_ROOT}/form`, {withCredentials: 'include'})
  return response.data
}

export const fetchProductAPI = async() => {
  const response = await axios.get(`${API_ROOT}/v1/product`, {withCredentials: 'include'})
  return response.data
}

export const fetchCreateProductAPI = async(product) => {
  const response = await axios.post(`${API_ROOT}/v1/product`, product, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    withCredentials: 'include'
  })
  return response.data
}

export const fetchProductDetailsAPI = async(id) => {
  const response = await axios.get(`${API_ROOT}/v1/product/${id}`, {withCredentials: 'include'})
  return response.data
}

export const fetchUpdateProductAPI = async(id, product, csrfToken) => {
  console.log(csrfToken);
  const response = await axios.put(
    `${API_ROOT}/v1/product/${id}`, 
    product, 
    {
      headers: {
        'xsrf-token': csrfToken
      },
      withCredentials: 'include'
    }
  )
  return response.data
}

export const fetchDeleteProductAPI = async(id) => {
  const response = await axios.delete(`${API_ROOT}/v1/product/${id}`, {withCredentials: 'include'})
  return response.data
}
