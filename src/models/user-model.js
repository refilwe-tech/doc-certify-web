import dayjs from "dayjs";
import { capitalize } from "lodash";

export const userModel = (user, role = "Certifyee") => ({
  userID: user?.user_id ?? 0,
  firstName: user?.first_name ?? "",
  lastName: user?.last_name ?? "",
  registrationDate: dayjs(user?.registration_date ?? new Date()).format(
    "MMMM DD, YYYY"
  ),
  role: capitalize(user?.user_type ?? role),
  ...user,
});

export const usersModel = (data) => ({
  users: data?.users?.map((user) => userModel(user)),
});

export const adminsModel = (data) => ({
  admins: data?.admins?.map((user) => userModel(user, "Admins")),
});

export const certifiersModel = (data) => ({
  certifiers: data?.certifiers?.map((user) => userModel(user, "Certifier")),
});
