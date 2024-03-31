import { Heading, Table } from "../../common";
import { Widget } from "../../widgets";
import { createColumnHelper } from "@tanstack/react-table";
import { AdminService } from "../../../services";
import { useEffect, useState } from "react";

export const AdminsPage = () => {
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
    }),
    columnHelper.accessor("firstName", {
      header: "First Name",
    }),
    columnHelper.accessor("lastName", {
      header: "Last Name",
    }),
    columnHelper.accessor("email", {
      header: "Email",
    }),
    columnHelper.accessor("role", {
      header: "Role",
    }),
    columnHelper.accessor("actions", {
      header: "Actions",
    }),
  ];
  const [data, setData] = useState([]);

  useEffect(() => {
    AdminService.getAdmins().then((data) => setData(data));
  }, []);

  return (
    <section className="flex flex-col gap-4">
      <Heading heading="Admins" />
      <Widget>
        <Table data={data?.admins ?? []} columns={columns} />
      </Widget>
    </section>
  );
};
