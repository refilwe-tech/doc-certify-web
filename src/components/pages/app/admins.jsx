import { Heading, Table } from "../../common";
import { Widget } from "../../widgets";
import { AdminService } from "../../../services";
import { useEffect, useState } from "react";
import { userColumns } from "../../../constants";
import { IoCloseOutline } from "react-icons/io5";
import { UserForm } from "../../forms";
import { useModal } from "../../../hooks";

export const AdminsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, openModal, closeModal } = useModal(false);

  useEffect(() => {
    AdminService.getAdmins().then((data) => {
      setLoading(false);
      setData(data);
    });
  }, []);

  return (
    <section className="flex flex-col gap-4">
      <section className="flex justify-between items-center">
        <Heading heading="Admins" />
        <button
          onClick={openModal}
          className="hover:text-primary flex bg-primary hover:bg-white text-white items-center gap-2 hover:border hover:border-primary rounded-lg py-2 px-3 font-medium"
        >
          Add Admin
        </button>
      </section>
      <Widget>
        <Table
          data={data?.admins ?? []}
          columns={userColumns}
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
          <div className="bg-white p-4 rounded-lg ">
            <h2 className="text-xl font-semibold mb-4">Add Admin</h2>
            <p>Responsible for the system.</p>
            <UserForm role="Admin" />
          </div>
        </div>
      )}
    </section>
  );
};
