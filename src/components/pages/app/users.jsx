import { Heading, Table } from "../../common";
import { Widget } from "../../widgets";
import { UserService } from "../../../services";
import { useEffect, useState } from "react";
import { userColumns } from "../../../constants";

export const UsersPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    UserService.getUsers().then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="flex flex-col gap-4">
      <section className="flex justify-between items-center">
        <Heading heading="Users" />
        <button className="hover:text-primary flex bg-primary hover:bg-white text-white items-center gap-2 hover:border hover:border-primary rounded-lg py-2 px-3 font-medium">
          Add User
        </button>
      </section>
      <Widget>
        <Table
          data={data?.users ?? []}
          columns={userColumns}
          loading={loading}
        />
      </Widget>
    </section>
  );
};
