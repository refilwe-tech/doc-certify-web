import PropTypes from "prop-types";
import { map } from "lodash";

export const Dropdown = ({
  label,
  name,
  options,
  onChange,
  error,
  ...rest
}) => {
  return (
    <section className="py-2 flex flex-col">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        name={name}
        className="mt-1 h-10 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
        onChange={onChange}
        {...rest}
      >
        {map(options, ({ value, display }) => (
          <option key={value} value={value}>
            {display}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </section>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  options: PropTypes.array.isRequired,
};
