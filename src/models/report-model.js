import { map } from "lodash";

export const userReportModel = ({ user_count, percent, name }) => ({
  name: `Active ${name}s` ?? "",
  percentage: percent ?? 0,
  userCount: user_count ?? 0,
});

export const usersReportModel = ({ report }) => {
  return { report: map(report, userReportModel) };
};
