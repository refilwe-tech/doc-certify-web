import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { isEmpty } from "lodash";
import { userStore } from "../../reducers";
import { FormLayout } from "../layouts";
import { useFormik } from "formik";

export const UploadForm = () => {
  const { user } = userStore();
  const { handleSubmit, handleChange, values, setFieldError, errors } =
    useFormik({
      initialValues: {
        documentType: "",
        color: new File([""], "color"),
        copy: new File([""], "copy"),
        clientID: user?.userID ?? "",
      },
      onSubmit: (values) => {
        const formData = new FormData();
        formData.append("documentType", values.documentType);
        formData.append("color", values.color);
        formData.append("copy", values.copy);
        formData.append("clientID", values.clientID);

        console.log(values);
      },
    });

  const [selectedDocument, setSelectedDocument] = useState("");

  const handleDocumentChange = (event) => {
    setSelectedDocument(event.target.value);
  };

  const certificationOptions = [
    "Identification Documents",
    "Academic Certificates",
    "Legal Documents",
    "Financial Documents",
    "Medical Documents",
    "Property Documents",
    "Business Documents",
    "Official Government Documents",
  ];

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

  return (
    <FormLayout>
      <form className="py-2 px-5" onSubmit={handleSubmit}>
        <section className="flex flex-col gap-2">
          <section className="flex flex-col gap-1 py-3">
            <label
              htmlFor="documentType"
              className="block text-sm font-medium text-gray-700"
            >
              Select the type of document:
            </label>
            <select
              id="documentType"
              name="documentType"
              className="border block w-full pl-3 pr-10 py-2 text-base border-[#BDBDBD] focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-lg"
              value={selectedDocument}
              onChange={handleChange}
            >
              <option value="">Select...</option>
              {certificationOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </section>
          <section className="border border-dashed rounded-lg py-5 text-[#BDBDBD] bg-[#FAFAFA]">
            <section {...getRootProps({ className: "dropzone text-center" })}>
              <input
                onChange={handleChange}
                name="color"
                {...getInputProps()}
              />
              <p className="font-bold text-black/50">Color copy</p>
              <p>
                Drag &apos;n&apos; drop your file here, or click to select file
              </p>
              <em>
                (Only *.jpeg, *.png images and pdf documents will be accepted)
              </em>
            </section>
          </section>
          <aside>
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
          <section className="border border-dashed rounded-lg py-5 text-[#BDBDBD] bg-[#FAFAFA]">
            <section {...getRootProps({ className: "dropzone text-center" })}>
              <input name="copy" {...getInputProps()} />
              <p className="font-bold text-black/50">Black and White copy</p>
              <p>
                Drag &apos;n&apos; drop your file here, or click to select file
              </p>
              <em>
                (Only *.jpeg, *.png images and pdf documents will be accepted)
              </em>
            </section>
          </section>
          <aside>
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
          <section className="flex justify-center">
            <button className="btn-submit">Submit</button>
          </section>
        </section>
      </form>{" "}
    </FormLayout>
  );
};
