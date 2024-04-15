import axios from "axios";
import { API_ROOT } from "~/utils/const";

export const fetchBoardDetailsAPI = async(boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/board/${boardId}`)
  return response.data
}

