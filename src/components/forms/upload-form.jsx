import { useEffect, useState } from "react";
import { userStore } from "../../reducers";
import { FormLayout } from "../layouts";
import { useFormik } from "formik";
import { DocField } from "../common";
import { DocService } from "../../services";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyA-FYFh3LDZMYobiQkR8cf3U8uHYZMFTAY");

const getBase64 = (file) =>
  new Promise(function (resolve, reject) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject("Error: ", error);
  });

async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]);
    reader.readAsDataURL(file);
  });

  return {
    inlineData: {
      data: await base64EncodedDataPromise,
      mimeType: file.type,
    },
  };
}

export const UploadForm = () => {
  const { user } = userStore();
  const navigate = useNavigate();
  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      documentType: "",
      copy: null,
      clientID: user?.userID ?? "",
    },
    onSubmit: (values) => {
      const dto = new FormData();
      dto.append("client_id", values.clientID);
      if (values.copy && values.copy[0]) {
        dto.append(
          "copy",
          new File([values.copy[0]], `${values?.copy[0]?.name}`)
        );
      }
      dto.append("document_type", values.documentType);
      prompt();
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
  const [imageInlineData, setImageInlineData] = useState("");
  const [_image, setImage] = useState("");

  const handleDocumentTypeChange = (event) => {
    setSelectedDocument(event.target.value);
    const file = event.target.files[0];

    // getting base64 from file to render in DOM
    getBase64(file)
      .then((result) => {
        setImage(result);
      })
      .catch((e) => console.log(e));

    // generating content model for Gemini Google AI
    fileToGenerativePart(file).then((image) => {
      setImageInlineData(image);
    });
  };

  const prompt = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const result = await model.generateContent([
      `Based on the document, which is a ${selectedDocument} please confirm if the document is legit and belongs to this user: ${user}. 
      The response should be in a json object like this: 
      { legit: boolean, reason: string, can_certify: boolean}
      }.`,
      imageInlineData,
    ]);

    const response = await result.response;
    const text = await response.text();
    const json = JSON.parse(text);
    console.log("From API", json);
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
    if (!copyFile) return;
    handleChange({
      target: {
        name: "copy",
        value: copyFile,
      },
    });
    handleChange({
      target: {
        name: "documentType",
        value: selectedDocument,
      },
    });
  }, [copyFile, handleChange, selectedDocument]);

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

          <DocField
            title="Document Copy"
            name="copy"
            setAcceptedFiles={setCopyFile}
          />

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
