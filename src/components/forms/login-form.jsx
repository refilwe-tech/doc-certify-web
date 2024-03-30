import React from "react";
import { useFormik } from "formik";
import { FormLayout } from "../layouts";
import { InputField } from "../common";
import { LogoIcon } from "../../assets";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <FormLayout>
      <section className="py-5 flex justify-center items-center">
        <img src={LogoIcon} alt="logo" className="" />
      </section>
      <form className="py-10 px-5" onSubmit={handleSubmit}>
        <InputField
          label="Email"
          placeholder="Username/Email"
          name="email"
          type="email"
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
