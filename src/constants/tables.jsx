import { createColumnHelper } from "@tanstack/react-table";
import { DeleteButton, EditButton } from "../components";

const columnHelper = createColumnHelper();
export const userColumns = (userRole, onEdit) => [
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
    id: "Actions",
    cell: ({ row }) => {
      const { userID, role } = row.original;
      return (
        <div
          className={`flex items-center gap-2 ${
            userRole === role ? "hidden" : "visible"
          }`}
        >
          <EditButton
            onEdit={() => onEdit(row.original)}
            id={userID}
            userType={role}
          />{" "}
          |
          <DeleteButton id={userID} userType={role} />
        </div>
      );
    },
  }),
];
