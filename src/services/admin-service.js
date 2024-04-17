import axios from "axios";
import config from "../config";
import { adminsModel } from "../models";
const { hostUrl } = config;
const adminsUrls = {
  admins: `${hostUrl}/admins`,
  admin: `${hostUrl}/admin`,
};

const getAdmins = () => {
  return axios
    .get(adminsUrls.admins, {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    })
    .then((response) => adminsModel(response.data));
};

const getAdminsStats = () => {
  return axios.get(adminsUrls.adminsStats).then((response) => response.data);
};

export default {
  getAdminsStats,
  getAdmins,
};
