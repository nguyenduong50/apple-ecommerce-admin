import axios from "axios";
import { API_ROOT } from "~/utils/const";

export const fetchRoomChatAPI = async() => {
  const response = await axios.get(`${API_ROOT}/v1/roomchat`, {withCredentials: 'include'})
  return response.data
}

export const fetchMessageRoomAPI = async(roomId) => {
  const response = await axios.post(
    `${API_ROOT}/v1/message`, 
    {roomId: roomId},
    {withCredentials: 'include'}
  )
  return response.data
}

export const fetchSendMessageAPI = async(messageReq) => {
  const response = await axios.post(
    `${API_ROOT}/v1/message/send`, 
    messageReq,
    {withCredentials: 'include'}
  )
  return response.data
}