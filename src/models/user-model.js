import dayjs from "dayjs";

export const userModel = (user) => ({
  firstName: user.first_name,
  lastName: user.last_name,
  registrationDate: dayjs(user.registration_date).format("MMMM DD, YYYY"),
  ...user,
});
