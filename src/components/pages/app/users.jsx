import { Heading, Table } from "../../common";
import { Widget } from "../../widgets";
import { UserService } from "../../../services";
import { useEffect, useState } from "react";
import { userColumns } from "../../../constants";

export const UsersPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    UserService.getUsers().then((data) => setData(data));
  }, []);
  return (
    <section className="flex flex-col gap-4">
      <Heading heading="Users" />
      <Widget>
        <Table data={data?.users ?? []} columns={userColumns} />
      </Widget>
    </section>
  );
};
