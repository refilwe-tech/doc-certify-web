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

export default {
  getAdmins,
};
