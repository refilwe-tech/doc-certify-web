import axios from "axios";
import config from "../config";
import { userDTO, loginDTO } from "./dto";
const { hostUrl } = config;

const userUrls = {
  login: (userType) => `${hostUrl}/login?userType=${userType}`,
  register: `${hostUrl}/register?userType=client`,
};

const login = (user, userType) => {
  return axios
    .post(userUrls.login(userType), loginDTO(user))
    .then((response) => response.data);
};

const register = (user) => {
  return axios
    .post(userUrls.register, userDTO(user))
    .then((response) => response.data);
};

export default {
  login,
  register,
};
