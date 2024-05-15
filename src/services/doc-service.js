import axios from "axios";
import config from "../config";
import { docsModel } from "../models";

const { hostUrl } = config;

const docUrls = {
  docs: `${hostUrl}/docs`,
  doc: `${hostUrl}/doc`,
};
const uploadDoc = (data) => {
  return axios.post(docUrls.doc, data);
};
const getDocs = () => {
  return axios
    .get(docUrls.docs, {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    })
    .then((response) => docsModel(response.data));
};

export default {
  getDocs,
  uploadDoc,
};
