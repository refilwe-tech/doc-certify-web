import PropTypes from "prop-types";
import { AppNav, AuthNav } from "../navigation";

export const AppLayout = ({ children }) => {
  return (
    <main className="w-screen h-screen flex flex-col">
      <AuthNav />
      <section className="flex w-full h-full">
        <AppNav />
        <section className="p-5">{children}</section>
      </section>
    </main>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
