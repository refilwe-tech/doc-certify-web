import dayjs from "dayjs";

const enumRoles = {
  1: "Admin",
  2: "Certifier",
  3: "User",
};
export const userModel = (user) => ({
  userID: user?.user_id ?? 0,
  firstName: user?.first_name ?? "",
  lastName: user?.last_name ?? "",
  roleID: user?.role_id ?? 3,
  role: enumRoles[user?.role_id ?? 3],
  registrationDate: dayjs(user?.registration_date ?? new Date()).format(
    "MMMM DD, YYYY"
  ),
  ...user,
});
