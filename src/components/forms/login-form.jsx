import { useFormik } from "formik";
import { FormLayout } from "../layouts";
import { InputField, Dropdown } from "../common";
import { LogoIcon } from "../../assets";
import { Link } from "react-router-dom";
import { userStore } from "../../reducers";
import { AuthService } from "../../services";
import toast from "react-hot-toast";
import localForage from "localforage";
import { userModel } from "../../models";
import { capitalize } from "lodash";

export const LoginForm = () => {
  const { login } = userStore();
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "Certifyee",
    },

    onSubmit: (values) => {
      AuthService.login(values, values?.role)
        .then((res) => {
          login(res);
          localForage.setItem("user", userModel(res.user));
          localForage.setItem("authenticated", res.authenticated);
        })
        .catch(() => {
          toast.error("Invalid credentials. Please try again.");
        });
    },
  });

  return (
    <FormLayout>
      <section className="py-5 flex justify-center items-center">
        <img src={LogoIcon} alt="logo" className="" />
      </section>
      <h1 className="text-center before:animate-typewriter after:animate-caret">
        Hello, {capitalize(values?.role)}
      </h1>
      <form className="py-10 px-5" onSubmit={handleSubmit}>
        <Dropdown
          onChange={handleChange}
          label="Login as"
          name="role"
          options={[
            { value: "Certifyee", display: "Certifyee" },
            {
              value: "admin",
              display: "Admin",
            },
            {
              value: "certifier",
              display: "Certifier",
            },
          ]}
        />
        <InputField
          label="Username/Email"
          placeholder="Username/Email"
          name="email"
          type="text"
          onChange={handleChange}
          value={values.email}
        />
        <InputField
          placeholder="Password"
          label="Password"
          name="password"
          type="password"
          onChange={handleChange}
          value={values.password}
        />
        <section className="flex justify-between items-center px-5 pb-10">
          <p className="text-xs text-primary">Don&apos;t have an account?</p>
          <Link
            to="/register"
            className="text-xs text-blue-600 hover:text-blue-500"
          >
            Register an account
          </Link>
        </section>
        <section></section>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-1/4 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </div>
      </form>
    </FormLayout>
  );
};
