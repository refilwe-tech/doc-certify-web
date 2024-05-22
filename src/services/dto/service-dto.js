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

export const docDTO = (doc) => {
  const formData = new FormData();
  formData.append("document_type", doc.documentType);
  formData.append("original", doc.color);
  formData.append("copy", doc.copy);
  formData.append("client_id", doc.clientID);
  return formData;
};

export const assignDocDTO = (dto) => ({
  doc_id: dto.docID,
  certifier_id: dto.userID,
});
