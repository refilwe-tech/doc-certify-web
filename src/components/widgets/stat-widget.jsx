import { TfiStatsUp } from "react-icons/tfi";
import PropTypes from "prop-types";

export const StatWidget = ({ title, value, description }) => {
  return (
    <section className="bg-white drop-shadow-lg w-full rounded-xl p-5">
      <section className="flex justify-between items-center">
        <h4 className="text-2xl text-center">{title}</h4>
        <TfiStatsUp className="w-5 h-5" />
      </section>
      <section className="flex flex-col gap-1 justify-center items-center p-4">
        <h2 className="text-center font-medium text-7xl">{value}</h2>
        <p>{description}</p>
      </section>
    </section>
  );
};

StatWidget.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
