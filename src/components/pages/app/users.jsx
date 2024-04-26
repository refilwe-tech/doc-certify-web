import { Heading, Table } from "../../common";
import { Widget } from "../../widgets";
import { UserService } from "../../../services";
import { useEffect, useState } from "react";
import { userColumns } from "../../../constants";
import { IoCloseOutline } from "react-icons/io5";
import { UserForm } from "../../forms";
import { useModal } from "../../../hooks";
import { userStore, userInitialValues } from "../../../reducers";

export const UsersPage = () => {
  const { user } = userStore();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, openModal, closeModal } = useModal(false);
  const [editing, setEditing] = useState(false);
  const [currUser, setCurrUser] = useState(userInitialValues);
  const title = `${editing ? "Update" : "Add"} Certify-ee`;

  useEffect(() => {
    UserService.getUsers().then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  const onEdit = (u) => {
    setEditing(true);
    openModal();
    setCurrUser(u);
  };

  return (
    <section className="flex flex-col gap-4">
      <section className="flex justify-between items-center">
        <Heading heading="Certifyees" />
        <button
          onClick={openModal}
          className="hover:text-primary flex bg-primary hover:bg-white text-white items-center gap-2 hover:border hover:border-primary rounded-lg py-2 px-3 font-medium"
        >
          Add Certifyee
        </button>
      </section>
      <Widget>
        <Table
          data={data?.users ?? []}
          columns={userColumns(user.role, onEdit)}
          loading={loading}
        />
      </Widget>
      {isOpen && (
        <div className="fixed top-0 right-0 w-1/3 h-full rounded-lg shadow-lg bg-white z-50">
          <section className="flex justify-end p-4">
            <button onClick={closeModal}>
              <IoCloseOutline className="w-8 h-8 hover:text-blue-500" />
            </button>
          </section>
          <div className="bg-white p-4 rounded-lg">
            <section className="flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4">{title}</h2>
              <p className="text-center">
                A user who can access the system. They can be a student, staff
                or admin.
              </p>
            </section>

            <UserForm
              role="Certifyee"
              isEdit={editing}
              user={editing ? currUser : userInitialValues}
            />
          </div>
        </div>
      )}
    </section>
  );
};
