import PropTypes from "prop-types";

export const AppLayout = ({ children }) => {
  return <main className="w-screen h-screen">{children}</main>;
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
