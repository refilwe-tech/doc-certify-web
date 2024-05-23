import { useEffect, useState } from "react";
import { userStore } from "../../reducers";
import { FormLayout } from "../layouts";
import { useFormik } from "formik";
import { DocField } from "../common";
import { DocService } from "../../services";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const UploadForm = () => {
  const { user } = userStore();
  const navigate = useNavigate();
  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      documentType: "",
      color: null,
      copy: null,
      clientID: user?.userID ?? "",
    },
    onSubmit: (values) => {
      const dto = new FormData();
      dto.append("client_id", values.clientID);
      if (values.color && values.color[0]) {
        dto.append(
          "original",
          new File([values.color[0]], `${values?.color[0]?.name}`)
        );
      }
      if (values.copy && values.copy[0]) {
        dto.append(
          "copy",
          new File([values.copy[0]], `${values?.copy[0]?.name}`)
        );
      }
      dto.append("document_type", values.documentType);

      DocService.uploadDocs(dto)
        .then(() => {
          setTimeout(() => {
            navigate("/docs");
          }, 2000);
          toast.success("Document uploaded successfully", {
            timeout: 2000,
          });
        })
        .catch(() => {
          toast.error("Failed to upload document. Please try again.");
        })
        .catch(() => {
          toast.error("Failed to upload document. Please try again.");
        });
    },
  });

  const [selectedDocument, setSelectedDocument] = useState("");
  const [copyFile, setCopyFile] = useState();
  const [colorFile, setColorFile] = useState();

  const handleDocumentTypeChange = (event) => {
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

  useEffect(() => {
    if (!copyFile || !colorFile) return;
    handleChange({
      target: {
        name: "copy",
        value: copyFile,
      },
    });
    handleChange({
      target: {
        name: "color",
        value: colorFile,
      },
    });
    handleChange({
      target: {
        name: "documentType",
        value: selectedDocument,
      },
    });
  }, [copyFile, colorFile, handleChange, selectedDocument]);

  return (
    <FormLayout>
      <form
        className="py-2 px-5"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <section className="flex flex-col gap-4">
          <section className="flex flex-col gap-1">
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
              onChange={handleDocumentTypeChange}
            >
              <option value="">Select...</option>
              {certificationOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </section>
          <section className="flex items-center gap-4 justify-between">
            <DocField
              title="Color Copy"
              name="color"
              setAcceptedFiles={setColorFile}
            />
            <DocField
              title="Black & White Copy"
              name="copy"
              setAcceptedFiles={setCopyFile}
            />
          </section>
          <section className="flex justify-center">
            <button type="submit" className="btn-submit">
              Submit
            </button>
          </section>
        </section>
      </form>
    </FormLayout>
  );
};
