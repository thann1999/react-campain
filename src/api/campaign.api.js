/* eslint-disable import/no-anonymous-default-export */
import { message } from "antd";
import axios from "axios";

const CampaignAPI = {
  createCampaign: async (params) => {
    try {
      const response = await axios.request({
        method: 'POST',
        baseURL: process.env.REACT_APP_BASE_URL,
        url: `/campaign/create`,
        data: params
      })
      return response
    } catch (error) {
      message.error('Error')
    }
  },
};

export default CampaignAPI;
