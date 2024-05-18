import { useEffect, useState } from "react";
import { Heading, PieChartGraph } from "../../common";
import { ReportService } from "../../../services";
import { Widget } from "../../widgets";
import { FaRegFilePdf } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";

const colors = ["#FF33FF", "#235FF9", "#33FF57"];
export const ReportsPage = () => {
  const [usersTotals, setUsersTotals] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ReportService.getUsersReport().then((data) => {
      setUsersTotals(data.report);
      setLoading(false);
    });
  }, []);

  return (
    <section className="flex flex-col gap-2">
      <section className="flex items-center justify-between gap-2">
        <Heading heading="Report" />
        <button
          className="btn btn-primary hover:text-secondary"
          onClick={
            //print page as pdf
            () => window.print()
          }
        >
          <section className="flex items-center justify-between text-blue-400 gap-2">
            <FaRegFilePdf />
            <span>Export</span>
          </section>
        </button>
      </section>
      <Widget>
        <>
          <h1>Total Users</h1>
          {!loading ? (
            <PieChartGraph colors={colors} data={usersTotals} />
          ) : (
            <section className="flex justify-center gap-2">
              <ClipLoader className=" text-primary" /> Loading...
            </section>
          )}
        </>
      </Widget>

      <p>TO-DO:Average documents requests perDay, Average Responses per day</p>
      <p>TO-DO: Totals (system users), documents processed</p>
    </section>
  );
};
