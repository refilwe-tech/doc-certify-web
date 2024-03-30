export const userDTO = (user) => ({
  first_name: user.firstName,
  last_name: user.lastName,
  username: user.username,
  email: user.email,
  role_id: 3,
  password: user.password,
  phone: user.phone ?? "",
  //make user_id optional
  user_id: user.user_id ?? "",
});
