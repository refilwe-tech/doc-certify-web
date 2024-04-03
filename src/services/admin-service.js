import axios from "axios";
import config from "../config";
import { adminsModel } from "../models";
const { hostUrl } = config;
const adminsUrls = {
  admins: `${hostUrl}/admins`,
};

const getAdmins = () => {
  return axios
    .get(adminsUrls.admins)
    .then((response) => adminsModel(response.data));
};

const getAdminsStats = () => {
  return axios
    .get(adminsUrls.adminsStats, {
      "ngrok-skip-browser-warning": "1000",
    })
    .then((response) => response.data);
};

export default {
  getAdminsStats,
  getAdmins,
};
