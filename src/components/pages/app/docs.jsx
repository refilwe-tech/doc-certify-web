import { useEffect, useState } from "react";
import { DocService } from "../../../services";
import { Heading, Table } from "../../common";
import { Widget } from "../../widgets";
import { docColumns } from "../../../constants";
import { userStore } from "../../../reducers";

export const DocsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = userStore();

  useEffect(() => {
    DocService.getDocs(user?.userID).then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="flex flex-col gap-4">
      <Heading heading="My Docs" />
      <Widget>
        <Table data={data?.docs ?? []} columns={docColumns} loading={loading} />
      </Widget>
    </section>
  );
};
