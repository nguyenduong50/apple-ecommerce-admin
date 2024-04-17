import axios from "axios";
import { API_ROOT } from "~/utils/const";

export const fetchUserAPI = async() => {
  const response = await axios.get(`${API_ROOT}/v1/user`)
  return response.data
}

export const fetchProductAPI = async() => {
  const response = await axios.get(`${API_ROOT}/v1/product`)
  return response.data
}

export const fetchCreateProductAPI = async(product) => {
  const response = await axios.post(`${API_ROOT}/v1/product`, product, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const fetchProductDetailsAPI = async(id) => {
  const response = await axios.get(`${API_ROOT}/v1/product/${id}`)
  return response.data
}

export const fetchUpdateProductAPI = async(id, product) => {
  const response = await axios.put(`${API_ROOT}/v1/product/${id}`, product)
  return response.data
}

export const fetchDeleteProductAPI = async(id) => {
  const response = await axios.delete(`${API_ROOT}/v1/product/${id}`)
  return response.data
}
