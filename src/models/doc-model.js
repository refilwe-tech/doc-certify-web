import map from "lodash/map";
import dayjs from "dayjs";

export const docModel = (data) => {
  return {
    uploadDate: dayjs(data.upload_date).format("DD MMM YYYY HH:mm"),
    endDate: dayjs(data.end_date).format("DD/MM/YYYY"),
    dame: data.name,
    docType: data.document_type,
    status: data.status,
    /* CertifiedFile: doc.certified_file,
    OriginalFile: doc.original_file, */
    copyFile: data.copy_file,
    docID: data.document_id,
    clientID: data.client_id,
  };
};
export const docsModel = ({ docs }) => {
  return { docs: map(docs, (doc) => docModel(doc)) };
};
