import { Heading, Table } from "../../common";
import { Widget } from "../../widgets";
import { AdminService } from "../../../services";
import { useEffect, useState } from "react";
import { userColumns } from "../../../constants";

export const AdminsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    AdminService.getAdmins().then((data) => setData(data));
  }, []);

  return (
    <section className="flex flex-col gap-4">
      <Heading heading="Admins" />
      <Widget>
        <Table data={data?.admins ?? []} columns={userColumns} />
      </Widget>
    </section>
  );
};
