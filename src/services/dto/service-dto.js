export const userDTO = (user) => ({
  first_name: user.firstName,
  last_name: user.lastName,
  username: user.username,
  email: user.email.toLowerCase(),
  password: user.password,
  phone: user.phone ?? "",
  id: user.userID ?? "",
});

export const loginDTO = (user) => ({
  email: user.email.includes("@") ? user.email.toLowerCase() : user.email,
  password: user.password,
});

export const docDTO = (doc) => ({
  document_type: doc.documentType,
  original: doc.color,
  copy: doc.copy,
  client_id: doc.clientID,
});
