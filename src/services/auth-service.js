import axios from "axios";
import config from "../config";
const { hostUrl } = config;

const userUrls = {
  login: `${hostUrl}/login`,
  register: `${hostUrl}/register`,
};

const registerDTO = (user) => ({
  first_name: user.firstName,
  last_name: user.lastName,
  username: user.username,
  email: user.email,
  role_id: 3,
  password: user.password,
  phone: user.phone ?? "",
});

const login = (user) => {
  return axios.post(userUrls.login, user).then((response) => response.data);
};

const register = (user) => {
  return axios
    .post(userUrls.register, registerDTO(user))
    .then((response) => response.data);
};

export default {
  login,
  register,
};
