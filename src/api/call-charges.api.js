/* eslint-disable import/no-anonymous-default-export */
import { message } from "antd";
import axios from "axios";

class CallChargesAPI {
  getAllCallChargesList = async () => {
    try {
      const response = await axios.request({
        method: 'GET',
        baseURL: process.env.REACT_APP_BASE_URL,
        url: `/cdr/list-all`,
      })
      return response
    } catch (error) {
      message.error('Error')
      throw error
    }
  }
};

const instance = new CallChargesAPI()

export default instance;
