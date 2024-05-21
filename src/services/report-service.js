import axios from "axios";
import config from "../config";
import { usersReportModel, fullReportModel } from "../models";
const { hostUrl } = config;

const ReportUrls = {
  userReport: `${hostUrl}/report/users`,
  fullReport: `${hostUrl}/report/full`,
};

const getUsersReport = () => {
  return axios
    .get(ReportUrls.userReport, {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    })
    .then((response) => usersReportModel(response.data));
};

const getFullReport = () => {
  return axios
    .get(ReportUrls.fullReport, {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    })
    .then((response) => fullReportModel(response.data));
};

export default {
  getUsersReport,
  getFullReport,
};
