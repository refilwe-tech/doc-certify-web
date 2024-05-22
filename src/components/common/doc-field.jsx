import { useDropzone } from "react-dropzone";
import { isEmpty } from "lodash";
import PropTypes from "prop-types";
import { useEffect } from "react";

export const DocField = ({ setAcceptedFiles, name, title }) => {
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "image/jpeg": [],
        "image/png": [],
        "application/pdf": [],
      },
      maxFiles: 1,
    });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {Math.floor(file.size / 1000)} KB
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {Math.floor(file.size / 1000)} KB
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  useEffect(() => {
    setAcceptedFiles(acceptedFiles);
  }, [acceptedFiles, setAcceptedFiles]);

  return (
    <section>
      <section className="border border-dashed rounded-lg py-5 px-2 text-[#BDBDBD] bg-[#FAFAFA]">
        <section {...getRootProps({ className: "dropzone text-center" })}>
          <input type="file" name={name} {...getInputProps()} />
          <p className="font-bold text-black/50">{title}</p>
          <p>Drag &apos;n&apos; drop your file here, or click to select file</p>
          <em>
            (Only *.jpeg, *.png images and pdf documents will be accepted)
          </em>
        </section>
      </section>
      <aside className="h-6">
        {!isEmpty(acceptedFiles) && (
          <section className="flex gap-8 items-center">
            <h4 className="font-bold">Accepted files</h4>
            <ul>{acceptedFileItems}</ul>
          </section>
        )}
        {!isEmpty(fileRejections) && (
          <section className="flex gap-8 items-center">
            <h4 className="font-bold">Rejected files</h4>
            <ul>{fileRejectionItems}</ul>
          </section>
        )}
      </aside>
    </section>
  );
};

DocField.propTypes = {
  setAcceptedFiles: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
