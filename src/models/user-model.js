import dayjs from "dayjs";

const enumRoles = {
  1: "Admin",
  2: "Certifier",
  3: "User",
};
export const userModel = (user) => ({
  firstName: user.first_name,
  lastName: user.last_name,
  role: enumRoles[user.role_id],
  registrationDate: dayjs(user.registration_date).format("MMMM DD, YYYY"),
  ...user,
});
