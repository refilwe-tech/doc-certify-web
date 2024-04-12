import axios from "axios";
import config from "../config";
import { adminStatsModel } from "../models";
const { hostUrl } = config;

const DashboardUrls = {
  adminStats: `${hostUrl}/app`,
};

const getAdminsStats = () => {
  return axios
    .get(`${DashboardUrls.adminStats}/admin`, {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    })
    .then((response) => adminStatsModel(response.data));
};

export default {
  getAdminsStats,
};
