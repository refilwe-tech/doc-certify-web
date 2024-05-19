import axios from "axios";
import config from "../config";
import { docsModel } from "../models";
import { docDTO } from "./dto";
const { hostUrl } = config;

const docUrls = {
  docs: `${hostUrl}/docs`,
  doc: `${hostUrl}/doc`,
};
const uploadDocs = (data) => {
  const dto = docDTO(data);
  return axios.post(docUrls.doc, dto);
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
  uploadDocs,
};
