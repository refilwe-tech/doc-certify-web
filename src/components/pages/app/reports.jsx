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
            <>
              <h1 className="text-center font-semibold text-lg py-2">
                Certification Requests
              </h1>
              <section className="flex flex-row justify-evenly gap-2 items-center">
                <section className="flex flex-col border border-gray rounded-lg w-1/3 p-2 items-center gap-2">
                  <h1>Today</h1>
                  <p className="text-7xl font-extrabold">{requests.today}</p>
                </section>
                <section className="flex flex-col border border-gray w-1/3 rounded-lg p-2 items-center gap-2">
                  <h1>This Month</h1>
                  <p className="text-7xl font-extrabold">{requests.month}</p>
                </section>
                <section className="flex flex-col border border-gray w-1/3 rounded-lg p-2 items-center gap-2">
                  <h1> Requests</h1>
                  <p className="text-7xl font-extrabold">{requests.total}</p>
                </section>
              </section>
            </>
          </Widget>
          <Widget>
            <section className="flex justify-center flex-col gap-2 items-center">
              <h1 className="text-center font-semibold text-lg py-2">
                Total Users
              </h1>
              <p className="text-7xl font-extrabold">{totalUsers}</p>
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
      </section>
    </section>
  );
};
