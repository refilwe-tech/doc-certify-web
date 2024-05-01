import { Heading } from "../../common";
import { Widget } from "../../widgets";
import { UploadForm } from "../../forms";

export const NewDocPage = () => {
  return (
    <section className="flex flex-col gap-4">
      <Heading heading="Certify Your Docs" />
      <section className="flex justify-between items-center">
        <Widget>
          <h1 className="text-xl font-semibold">Upload your document</h1>
          <p className="text-[#BDBDBD]">
            Please upload your document to get it certified.
          </p>
          <UploadForm />
        </Widget>
      </section>
    </section>
  );
};
