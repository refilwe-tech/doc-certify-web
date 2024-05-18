import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { map } from "lodash";
import PropTypes from "prop-types";

export const LegendSymbol = ({ bgColor }) => {
  return (
    <div
      className="symbol h-[14px] w-[14px] rounded-sm"
      style={{ backgroundColor: bgColor }}
    />
  );
};

const CustomTooltip = ({ payload }) => {
  if (payload && payload.length) {
    // eslint-disable-next-line react/prop-types
    const { name, percentage } = payload?.[0]?.payload || {};
    return (
      <div className="custom-tooltip flex flex-col rounded-2xl border bg-white p-2 opacity-70 shadow-sm drop-shadow-sm focus:border">
        <h1 className="text-center font-extralight text-black">{`${name}: ${percentage?.toFixed(
          2
        )}%`}</h1>
      </div>
    );
  }
  return null;
};

export const PieChartGraph = ({ colors, data }) => {
  const fills = colors;

  return (
    <section className="pie-chart grid min-h-[80%] place-items-center gap-2 text-[#748AA1] md:grid-cols-2 lg:flex-row lg:items-center">
      <div style={{ width: 200, height: 150 }}>
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              dataKey="percentage"
              innerRadius={50}
              outerRadius={65}
            >
              {map(data, (entry, index) => {
                return <Cell key={`cell-${index}`} fill={fills[index]} />;
              })}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <section className="pie-legend flex justify-between gap-5 font-light">
        <div className="symbols flex flex-col gap-2">
          <h3 className="text-sm font-light text-[#8D8D8D]">Symbol</h3>
          {map(data, ({ name }, index) => (
            <div key={name} className="flex items-center gap-2">
              <LegendSymbol bgColor={fills[index]} />
              <span className="text-xs">{name}</span>
            </div>
          ))}
        </div>
        <div className="percentiles flex flex-col gap-2">
          <h3 className="text-sm font-light text-[#8D8D8D]">Percentile</h3>
          {map(data, ({ percentage }, index) => (
            <div key={index} className="flex items-center gap-2">
              <p className="text-xs">{percentage.toFixed(1)}%</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

CustomTooltip.propTypes = {
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      percentage: PropTypes.number,
    })
  ),
};

PieChartGraph.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      percentage: PropTypes.number,
    })
  ),
};

LegendSymbol.propTypes = {
  bgColor: PropTypes.string,
};
