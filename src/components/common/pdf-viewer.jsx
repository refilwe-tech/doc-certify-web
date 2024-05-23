import PropTypes from "prop-types";

export const PDFViewer = ({ url1, url2 }) => {
  return (
    <div className="flex">
      <div className="w-1/2 p-2">
        <p className="text-center">original</p>
        {url1 && <iframe src={url1} width="100%" height="500px" />}
      </div>
      <div className="w-1/2 p-2">
        <p className="text-center">copy</p>
        {url2 && <iframe src={url2} width="100%" height="500px" />}
      </div>
    </div>
  );
};

PDFViewer.propTypes = {
  url1: PropTypes.string.isRequired,
  url2: PropTypes.string.isRequired,
};
