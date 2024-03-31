import { Heading, Table } from "../../common";
import { Widget } from "../../widgets";
import { CertifierService } from "../../../services";
import { useEffect, useState } from "react";
import { userColumns } from "../../../constants";

export const CertifiersPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    CertifierService.getCertifiers().then((data) => setData(data));
  }, []);

  return (
    <section className="flex flex-col gap-4">
      <Heading heading="Certifiers" />
      <Widget>
        <Table data={data?.certifiers ?? []} columns={userColumns} />
      </Widget>
    </section>
  );
};
