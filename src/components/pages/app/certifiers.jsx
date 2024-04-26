import { Heading, Table } from "../../common";
import { Widget } from "../../widgets";
import { CertifierService } from "../../../services";
import { useEffect, useState } from "react";
import { userColumns } from "../../../constants";
import { IoCloseOutline } from "react-icons/io5";
import { UserForm } from "../../forms";
import { useModal } from "../../../hooks";
import { userStore, userInitialValues } from "../../../reducers";

export const CertifiersPage = () => {
  const { user } = userStore();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [currUser, setCurrUser] = useState(userInitialValues);
  const title = `${editing ? "Update" : "Add"} Certifier`;

  const {
    isOpen: showModal,
    openModal: setShowModal,
    closeModal,
  } = useModal(false);

  useEffect(() => {
    CertifierService.getCertifiers().then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  const onEdit = (u) => {
    setEditing(true);
    setShowModal();
    setCurrUser(u);
  };

  return (
    <section className="flex flex-col gap-4 w-full h-full">
      <section className="flex justify-between items-center">
        <Heading heading="Certifiers" />
        <button
          onClick={() => setShowModal(true)}
          className="hover:text-primary flex bg-primary hover:bg-white text-white items-center gap-2 hover:border hover:border-primary rounded-lg py-2 px-3 font-medium"
        >
          Add Certifier
        </button>
      </section>
      <Widget>
        <Table
          data={data?.certifiers ?? []}
          columns={userColumns(user.role, onEdit)}
          loading={loading}
        />
      </Widget>
      {showModal && (
        <div className="fixed top-0 right-0 w-1/3 h-full rounded-lg shadow-lg bg-white z-50">
          <section className="flex justify-end p-4">
            <button onClick={closeModal}>
              <IoCloseOutline className="w-8 h-8 hover:text-blue-500" />
            </button>
          </section>
          <div className="bg-white p-4 rounded-lg">
            <section className="flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4">{title}</h2>
              <p>An authorized person to certify documents.</p>
            </section>
            <UserForm
              role="Certifier"
              isEdit={editing}
              user={editing ? currUser : userInitialValues}
            />
          </div>
        </div>
      )}
    </section>
  );
};
