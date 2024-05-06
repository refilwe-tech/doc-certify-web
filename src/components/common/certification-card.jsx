import PropTypes from "prop-types";
import { Widget } from "../widgets";

export const CertificationCard = ({ title, description, color }) => {
  return (
    <Widget color={`${color}`}>
      <section className="hover:scale-105">
        <section className="flex text-white flex-col gap-3">
          <h2 className="font-bold text-base">{title}</h2>
          <p className="text-gray-700 text-xs">{description}</p>
        </section>
      </section>
    </Widget>
  );
};

CertificationCard.propTypes = {
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
