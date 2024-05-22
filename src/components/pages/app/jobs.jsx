import { useQuery } from "@tanstack/react-query";
import { JobService } from "../../../services";
import { Heading, Table } from "../../common";
import { Widget } from "../../widgets";
import { jobColumns } from "../../../constants";
import { userStore } from "../../../reducers";

export const JobsPage = () => {
  const { user } = userStore();
  const { data, isLoading } = useQuery({
    queryKey: ["getJobs"],
    queryFn: () => JobService.getJobs(),
  });

  return (
    <section className="flex flex-col gap-4">
      <Heading heading="My Docs" />
      <Widget>
        <Table
          data={data?.docs ?? []}
          columns={jobColumns(user?.userID)}
          loading={isLoading}
        />
      </Widget>
    </section>
  );
};
