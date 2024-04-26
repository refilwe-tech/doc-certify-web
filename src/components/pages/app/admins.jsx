import { Heading, Table } from "../../common";
import { Widget } from "../../widgets";
import { AdminService } from "../../../services";
import { useEffect, useState } from "react";
import { userColumns } from "../../../constants";
import { IoCloseOutline } from "react-icons/io5";
import { UserForm } from "../../forms";
import { useModal } from "../../../hooks";
import { userStore, userInitialValues } from "../../../reducers";

export const AdminsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, openModal, closeModal } = useModal(false);
  const [editing, setEditing] = useState(false);
  const { user } = userStore();
  const [currUser, setCurrUser] = useState(userInitialValues);

  const onEdit = (u) => {
    setEditing(true);
    openModal();
    setCurrUser(u);
  };

  useEffect(() => {
    AdminService.getAdmins().then((data) => {
      setLoading(false);
      setData(data);
    });
  }, []);
  const title = `${editing ? "Update" : "Add"} Admin`;

  return (
    <section className="flex flex-col gap-4">
      <section className="flex justify-between items-center">
        <Heading heading="Admins" />
        {user.role === "Sudo" && (
          <button
            onClick={openModal}
            className="hover:text-primary flex bg-primary hover:bg-white text-white items-center gap-2 hover:border hover:border-primary rounded-lg py-2 px-3 font-medium"
          >
            Add Admin
          </button>
        )}
      </section>
      <Widget>
        <Table
          data={data?.admins ?? []}
          columns={userColumns(user.role, onEdit)}
          loading={loading}
        />
      </Widget>
      {isOpen && (
        <div className="fixed top-0 right-0 w-1/3 h-full rounded-lg shadow-lg bg-white z-50">
          <section className="flex justify-end p-4">
            <button
              onClick={() => {
                setEditing(false);
                closeModal();
              }}
            >
              <IoCloseOutline className="w-8 h-8 hover:text-blue-500" />
            </button>
          </section>
          <div className="bg-white p-4 rounded-lg">
            <section className="flex flex-col items-center">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p>Responsible for the system.</p>
            </section>
            <UserForm
              role="Admin"
              isEdit={editing}
              user={editing ? currUser : userInitialValues}
            />
          </div>
        </div>
      )}
    </section>
  );
};
