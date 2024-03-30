import axios from "axios";
import config from "../config";
const { hostUrl } = config;

const userUrls = {
  login: `${hostUrl}/login`,
  register: `${hostUrl}/register`,
};

const login = (user) => {
  return axios.post(userUrls.login, user).then((response) => response.data);
};

const register = (user) => {
  return axios.post(userUrls.register, user).then((response) => response.data);
};

export default {
  login,
  register,
};
