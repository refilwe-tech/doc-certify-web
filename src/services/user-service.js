import axios from "axios";
import config from "../config";
import { userModel, usersModel } from "../models";
import { userDTO } from "./dto";

const { hostUrl } = config;

const userUrls = {
  user: (id, userType) => `${hostUrl}/users/${id}?userType=${userType}`,
  users: `${hostUrl}/users`,
  userQuery: (userType) => `${hostUrl}/user?userType=${userType}`,
};

const createUser = (user, userType) => {
  return axios
    .post(userUrls.userQuery(userType), userDTO(user))
    .then((response) => response.data);
};

const getUser = (id, userType) => {
  return axios
    .get(userUrls.user(id, userType), {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    })
    .then((response) => userModel(response.data));
};

const updateUser = (user) => {
  const userType =
    user.role === "Sudo" || user.role === "Admin" ? "Admin" : user.role;
  return axios
    .put(userUrls.user(user?.userID, userType), userDTO(user))
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

const deleteUser = (id, userType) => {
  return axios
    .delete(userUrls.user(id, userType))
    .then((response) => response.data);
};

export default {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  createUser,
};
