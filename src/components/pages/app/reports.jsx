import { useEffect, useState } from "react";
import { Heading, PieChartGraph } from "../../common";
import { ReportService } from "../../../services";
import { pick, map, sumBy } from "lodash";

const colors = ["#FF33FF", "#235FF9", "#344F93"];
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
    <section>
      <Heading heading="Report" />
      <PieChartGraph colors={colors} data={usersTotals} />
      <p>TO-DO:Average documents requests perDay, Average Responses per day</p>
      <p>TO-DO: Totals (system users), documents processed</p>
    </section>
  );
};
