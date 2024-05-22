import axios from "axios";
import config from "../config";
import { docsModel } from "../models";
import { docDTO } from "./dto";
const { hostUrl } = config;

const docUrls = {
  docs: `${hostUrl}/docs`,
  doc: `${hostUrl}/doc`,
  docsById: (id) => `${hostUrl}/docs?client_id=${id}`,
};

const uploadDocs = (data) => {
  const formData = docDTO(data);
  return axios.post(docUrls.doc, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getDocs = (id) => {
  return axios
    .get(docUrls.docsById(id), {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    })
    .then((response) => docsModel(response.data));
};

const deleteDoc = (id) => {
  return axios.delete(`${docUrls.docsById(id)}`);
};

export default {
  getDocs,
  uploadDocs,
  deleteDoc,
};
