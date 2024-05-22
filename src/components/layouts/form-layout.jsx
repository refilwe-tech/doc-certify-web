import PropTypes from "prop-types";

export const FormLayout = ({ children }) => {
  return <section className="w-full flex flex-col">{children}</section>;
};

FormLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
