import axios from "axios";
import config from "../config";
import { docsModel } from "../models";
import { docDTO } from "./dto";
const { hostUrl } = config;

const docUrls = {
  docs: `${hostUrl}/docs`,
  doc: `${hostUrl}/doc`,
  docsById: (id) => `${hostUrl}/docs/${id}`,
};

const uploadDocs = (data) => {
  const dto = docDTO(data);
  return axios.post(docUrls.doc, dto, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
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

const deleteDoc = (id) => {
  return axios.delete(`${docUrls.docsById(id)}`);
};

export default {
  getDocs,
  uploadDocs,
  deleteDoc,
};
