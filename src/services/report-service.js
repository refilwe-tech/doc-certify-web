import axios from "axios";
import config from "../config";
import { usersReportModel } from "../models";
const { hostUrl } = config;

const ReportUrls = {
  userReport: `${hostUrl}/report/users`,
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

export default {
  getUsersReport,
};
