import axios from "axios";
import config from "../config";
import { userModel, usersModel } from "../models";
import { userDTO } from "./dto";

const { hostUrl } = config;

const userUrls = {
  user: (id) => `${hostUrl}/users/${id}`,
  users: `${hostUrl}/users`,
  userQuery: (userType) => `${hostUrl}/user?userType=${userType}`,
};

const createUser = (user, userType) => {
  return axios
    .post(userUrls.userQuery(userType), userDTO(user))
    .then((response) => response.data);
};

const getUser = (id) => {
  return axios
    .get(userUrls.user(id), {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    })
    .then((response) => userModel(response.data));
};

const updateUser = (user) => {
  return axios
    .put(userUrls.user(user?.userID), userDTO(user))
    .then((response) => response.data);
};

const getUsers = () => {
  return axios
    .get(userUrls.users, {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    })
    .then((response) => usersModel(response.data));
};

const deleteUser = (id) => {
  return axios.delete(userUrls.user(id)).then((response) => response.data);
};

export default {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  createUser,
};
