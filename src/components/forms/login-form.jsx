import React from "react";
import { useFormik } from "formik";
import { FormLayout } from "../layouts";
import { InputField } from "../common";

export const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
      firstname: "",
      lastname: "",
    },

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <FormLayout>
      <form>
        <InputField
          label="Email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />

        <div className="mb-4">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </div>
      </form>
    </FormLayout>
  );
};
