import axios from "axios";
import config from "../config";
import {
  adminStatsModel,
  certifierStatsModel,
  certifyeeStatsModel,
} from "../models";
const { hostUrl } = config;

const DashboardUrls = {
  adminStats: `${hostUrl}/app`,
  certifyee: (id) => `${hostUrl}/app/certifyee/${id}`,
  certifier: (id) => `${hostUrl}/app/certifier/${id}`,
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

const getCertifyeeStats = (id) => {
  return axios
    .get(`${DashboardUrls.certifyee(id)}`, {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    })
    .then((response) => certifyeeStatsModel(response.data));
};

const getCertifierStats = (id) => {
  return axios
    .get(`${DashboardUrls.certifier(id)}`, {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    })
    .then((response) => certifierStatsModel(response.data));
};

export default {
  getAdminsStats,
  getCertifyeeStats,
  getCertifierStats,
};
