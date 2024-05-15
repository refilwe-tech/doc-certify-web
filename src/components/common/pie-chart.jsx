import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export const LegendSymbol = ({ bgColor }) => {
  return (
    <div
      className="symbol h-3 w-3 rounded-sm"
      style={{ backgroundColor: bgColor }}
    />
  );
};

export const PieChartGraph = ({ colors, data }) => {
  const fills = colors;
  const CustomTooltip = ({ payload }) => {
    if (payload && payload.length) {
      const { name, percentage } = payload[0].payload;
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
              {data?.map((entry, index) => {
                return <Cell key={`cell-${index}`} fill={fills[index]} />;
              })}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <section className="pie-legend flex gap-10 font-light">
        <div className="symbols">
          <h3 className="text-sm font-light text-[#8D8D8D]">Symbol</h3>
          {data?.map(({ category }, index) => (
            <div key={category} className="flex items-center gap-2">
              <LegendSymbol bgColor={fills[index]} />
              <span className="text-xs">{name}</span>
            </div>
          ))}
        </div>
        <div className="percentiles">
          <h3 className="text-sm font-light text-[#8D8D8D]">Percentile</h3>
          {data?.map(({ percentage }, index) => (
            <p className="text-xs" key={index}>
              {percentage.toFixed(1)}%
            </p>
          ))}
        </div>
      </section>
    </section>
  );
};
