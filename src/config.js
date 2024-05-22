const { VITE_HOST_URL } = import.meta.env;

export default {
  hostUrl: VITE_HOST_URL,
  uploadsUrls: VITE_HOST_URL.replace("api", "uploads"),
};
