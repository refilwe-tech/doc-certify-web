import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();
export const userColumns = [
  columnHelper.accessor("userID", {
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
  columnHelper.display({
    header: "Actions",
  }),
];
