import axios from "axios";
import config from "../config";
import { userModel } from "../models";
import { userDTO } from "./dto";

const { hostUrl } = config;

const userUrls = {
  user: (id) => `${hostUrl}/user/${id}`,
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

export default {
  getUser,
  updateUser,
};
