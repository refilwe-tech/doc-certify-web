import PropTypes from "prop-types";

export const Widget = ({ children, color = "bg-white" }) => {
  return (
    <section className={`${color} drop-shadow-lg w-full rounded-xl p-5`}>
      {children}
    </section>
  );
};

Widget.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
};
