import { createColumnHelper } from "@tanstack/react-table";
import { DeleteButton, EditButton } from "../components";
import { GoCheckCircle, GoCheckCircleFill, GoTrash } from "react-icons/go";
import { DocService } from "../services";
import { toast } from "react-hot-toast";

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

const onDeleteDoc = (id) => {
  DocService.deleteDoc(id)
    .then(() => {
      toast.success("Document retracted successfully.", { duration: 3000 });
    })
    .catch((error) => {
      toast.error(error);
      toast.error("Failed to retract document. Please try again.");
    });
};

export const docColumns = [
  columnHelper.accessor("docID", {
    header: "ID",
  }),
  columnHelper.accessor("docType", {
    header: "Document Type",
  }),
  columnHelper.accessor("uploadDate", {
    header: "Upload Date",
  }),
  columnHelper.accessor("status", {
    header: "Status",
  }),

  columnHelper.display({
    id: "Actions",
    cell: ({ row }) => {
      const { docID } = row.original;
      return (
        <a target="_blank" href={`/doc/${docID}`} className="text-blue-500">
          View
        </a>
      );
    },
  }),
  {
    id: "Delete",
    cell: ({ row }) => {
      const { docID } = row.original;
      return (
        <button
          className="p-2 hover:text-red-500 flex items-center gap-1"
          onClick={() => onDeleteDoc(docID)}
        >
          <GoTrash /> Retract
        </button>
      );
    },
  },
];

const assignToClient = (docID, userID) => {
  DocService.assignToClient(docID, userID)
    .then(() => {
      toast.success("Document assigned successfully.", { duration: 3000 });
    })
    .catch((error) => {
      toast.error(error);
      toast.error("Failed to assign document. Please try again.");
    });
};

export const jobColumns = (userID) => [
  columnHelper.accessor("docID", {
    header: "ID",
  }),
  columnHelper.accessor("docType", {
    header: "Document Type",
  }),
  columnHelper.accessor("uploadDate", {
    header: "Upload Date",
  }),
  columnHelper.accessor("status", {
    header: "Status",
  }),
  columnHelper.accessor("certifier", {
    header: "Certifier",
  }),

  columnHelper.display({
    id: "ViewActions",
    cell: ({ row }) => {
      const { docID } = row.original;
      return (
        <a target="_blank" href={`/doc/${docID}`} className="text-blue-500">
          View
        </a>
      );
    },
  }),
  {
    id: "Assign",
    cell: ({ row }) => {
      const { docID, status } = row.original;
      console.log(row.original);
      return (
        <button
          className="p-2 flex items-center gap-1"
          onClick={() => assignToClient(docID, userID)}
        >
          {status === "pending" ? (
            <GoCheckCircle />
          ) : (
            <GoCheckCircleFill className="text-green-500" />
          )}
          Assign
        </button>
      );
    },
  },
];
