import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { JobService } from "../../../services";
import { Heading, PDFViewer, Table } from "../../common";
import { Widget } from "../../widgets";
import { jobColumns } from "../../../constants";
import { userStore } from "../../../reducers";
import { CertifyModal } from "../../modals";

export const MyJobsPage = () => {
  const [urls, setUrls] = useState();
  const [open, setOpen] = useState(false);
  const [docID, setDocID] = useState();
  const { user } = userStore();
  const { data, isLoading } = useQuery({
    queryKey: ["getMyJobs"],
    queryFn: () => JobService.getMyJobs(user?.userID),
  });

  return (
    <section className="flex flex-col gap-4">
      <Heading heading="My Jobs" />
      <Widget>
        <Table
          data={data?.docs ?? []}
          columns={jobColumns(user?.userID, setUrls, setOpen, setDocID)}
          loading={isLoading}
        />
      </Widget>
      <CertifyModal docID={docID} showModal={open} setShowModal={setOpen}>
        <PDFViewer url1={urls?.original} url2={urls?.copy} />
      </CertifyModal>
    </section>
  );
};
