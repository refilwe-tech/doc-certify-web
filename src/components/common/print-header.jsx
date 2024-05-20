import { forwardRef } from "react";
import PropTypes from "prop-types";
import { LogoIcon } from "../../assets";
import { Heading } from "./heading";

export const PrintHeader = forwardRef(({ title }, ref) => {
  return (
    <header ref={ref} className="hidden print:block flex flex-col gap-3">
      <section className="flex items-center justify-center gap-2">
        <img src={LogoIcon} alt="logo" className="w-auto h-auto" />
      </section>
      <section className="flex justify-between items-center">
        <Heading heading={title} />
        <section className="flex items-center text-xs gap-2">
          <span className="text-gray-400">Generated on:</span>
          <span className="text-green-500">{new Date().toDateString()}</span>
        </section>
      </section>
    </header>
  );
});

PrintHeader.displayName = "PrintHeader";

PrintHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
