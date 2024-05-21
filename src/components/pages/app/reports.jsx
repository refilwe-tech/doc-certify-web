import { useEffect, useRef, useState } from "react";
import { Heading, PieChartGraph, PrintHeader } from "../../common";
import { ReportService } from "../../../services";
import { Widget } from "../../widgets";
import { FaRegFilePdf } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";
import ReactToPrint from "react-to-print";

export const ReportsPage = () => {
  const [usersTotals, setUsersTotals] = useState();
  const [requests, setRequests] = useState({ today: 0, month: 0, total: 0 });
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const ref = useRef();

  const colors = ["#FF33FF", "#235FF9", "#33FF57"];

  useEffect(() => {
    ReportService.getFullReport().then((data) => {
      setUsersTotals(data.userStatReport);
      setRequests({
        today: data.requestsToday,
        month: data.requestsThisMonth,
        total: data.totalRequests,
      });
      setTotalUsers(data.totalUsers);
      setLoading(false);
    });
  }, []);

  return (
    <section className="flex flex-col gap-2">
      <section className="no-print flex items-center justify-between gap-2">
        <Heading heading="Report" />
        <ReactToPrint
          trigger={() => (
            <button className="btn btn-primary hover:text-secondary">
              <section className="flex items-center justify-between text-blue-400 gap-2">
                <FaRegFilePdf />
                <span>Export</span>
              </section>
            </button>
          )}
          content={() => ref?.current}
        />
      </section>

      <section ref={ref} className="flex flex-col gap-2 px-4">
        <PrintHeader title="Report" />
        <section className="grid grid-cols-2 gap-2">
          <Widget>
            <section className="flex"></section>
          </Widget>
          <Widget>
            <section className="flex justify-center flex-col gap-2 items-center">
              <h1>Total Users</h1>
              <p className="text-6xl">{totalUsers}</p>
            </section>
          </Widget>
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
        <p>
          TO-DO:Average documents requests perDay, Average Responses per day
        </p>
        <p>TO-DO: Totals (system users), documents processed</p>
      </section>
    </section>
  );
};
