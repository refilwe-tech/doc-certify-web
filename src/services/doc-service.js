import axios from "axios";
import config from "../config";
import { docsModel } from "../models";
import { assignDocDTO } from "./dto";
const { hostUrl } = config;

const docUrls = {
  docs: `${hostUrl}/docs`,
  doc: `${hostUrl}/doc/upload`,
  assignDoc: `${hostUrl}/doc/assign`,
  docById: (id) => `${hostUrl}/doc/${id}`,
  docsById: (id) => `${hostUrl}/docs?client_id=${id}`,
};

const uploadDocs = (formData) => {
  return axios.post(docUrls.doc, formData, {
    headers: {
      "content-type": "multipart/form-data",
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
  return axios.delete(`${docUrls.docById(id)}`);
};

const assignDoc = (docID, userID) => {
  const dto = assignDocDTO({ docID, userID });
  return axios.put(docUrls.assignDoc, dto);
};

export default {
  getDocs,
  assignDoc,
  deleteDoc,
  uploadDocs,
};
