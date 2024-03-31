import axios from "axios";
import config from "../config";
import { userModel, usersModel } from "../models";
import { userDTO } from "./dto";

const { hostUrl } = config;

const userUrls = {
  user: (id) => `${hostUrl}/user/${id}`,
  users: `${hostUrl}/users`,
};

const getUser = (id) => {
  return axios
    .get(userUrls.user(id))
    .then((response) => userModel(response.data));
};

const updateUser = (user) => {
  return axios
    .post(userUrls.user(user?.id), userDTO(user))
    .then((response) => response.data);
};

const getUsers = () => {
  return axios
    .get(userUrls.users)
    .then((response) => usersModel(response.data));
};

export default {
  getUser,
  getUsers,
  updateUser,
};
