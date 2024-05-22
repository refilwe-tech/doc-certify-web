import axios from "axios";
import config from "../config";
import { docsModel } from "../models";
const { hostUrl } = config;

const jobUrls = {
  jobs: `${hostUrl}/jobs`,
};

const getJobs = () => {
  return axios
    .get(jobUrls.jobs, {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    })
    .then((response) => docsModel(response.data));
};

export default {
  getJobs,
};
