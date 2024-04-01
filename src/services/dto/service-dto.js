import { lowerCase } from "lodash";

export const userDTO = (user) => ({
  first_name: user.firstName,
  last_name: user.lastName,
  username: user.username,
  email: lowerCase(user.email),
  role_id: user?.roleID ?? 1,
  password: user.password,
  phone: user.phone ?? "",
  id: user.userID ?? "",
});
