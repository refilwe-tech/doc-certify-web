import { useFormik } from "formik";
import { FormLayout } from "../layouts";
import { InputField } from "../common";
import { UserService } from "../../services";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { lowerCase } from "lodash";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useState } from "react";

export const UserForm = ({ role, user, isEdit }) => {
  const [success, setSuccess] = useState(false);
  const registrationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .required("Required*"),
    lastName: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .required("Required*"),
    email: Yup.string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .email()
      .required("Required*"),
    password: Yup.string()
      .min(3, "Should have at least 8 characters")
      .max(8, "Should have a maximum of 10 characters")
      .required("Required*"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must be a number")
      .required("Required*"),
    username: Yup.string()
      .min(3, "Too short!")
      .max(10, "Too long!")
      .required("Required*"),
  });

  const onEdit = (formData) => {
    UserService.updateUser(formData)
      .then(() => {
        toast.success("Profile updated successfully.", { duration: 3000 });
      })
      .catch((error) => {
        toast.error(error);
        toast.error("Failed to update profile. Please try again.");
      });
  };

  const onAdd = (formData) => {
    UserService.createUser(formData, lowerCase(role))
      .then(() => {
        toast.success(`${role} added successfully.`, {
          duration: 3000,
        });
        setSuccess(true);
      })
      .catch(({ response }) => {
        const { error } = response.data;
        const { email, phone } = error;
        setFieldError("email", email);
        setFieldError("phone", phone);
        toast.error(email ? email : phone, { duration: 3000 });
        toast.error("Failed to create account. Please try again.");
      });
  };

  const { handleSubmit, handleChange, values, setFieldError, errors } =
    useFormik({
      initialValues: user,
      validationSchema: registrationSchema,
      onSubmit: (values) => {
        isEdit ? onEdit(values) : onAdd(values);
      },
    });

  const title = `${isEdit ? "Update" : "Add"} ${role}`;

  return (
    <FormLayout>
      {success && (
        <Navigate to="/certifiers" replace={true} state={setSuccess(false)} />
      )}
      <form className="py-2 px-5" onSubmit={handleSubmit}>
        <InputField
          label="First Name"
          placeholder="First Name"
          name="firstName"
          type="text"
          onChange={handleChange}
          value={values.firstName}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          placeholder="Last Name"
          name="lastName"
          type="text"
          onChange={handleChange}
          value={values.lastName}
          error={errors.lastName}
        />
        <InputField
          label="Username"
          placeholder="Username"
          name="username"
          type="text"
          onChange={handleChange}
          value={values.username}
          error={errors.username}
        />
        {/*         <InputField
          placeholder="ID Number"
          label="ID Number"
          name="idNumber"
          type="phone"
          onChange={handleChange}
          value={values.idNumber}
          error={errors.idNumber}
        /> */}
        <InputField
          label="Role"
          disabled
          placeholder={role}
          name="role"
          type="text"
          onChange={handleChange}
          value={values.role}
          error={errors.role}
        />
        <InputField
          label="Email"
          placeholder="Email"
          name="email"
          type="text"
          onChange={handleChange}
          value={values.email}
          error={errors.email}
        />
        <InputField
          placeholder="Password"
          label="Password"
          name="password"
          type="password"
          onChange={handleChange}
          value={values.password}
          error={errors.password}
        />
        <InputField
          placeholder="Phone Number"
          label="Phone Number"
          name="phone"
          type="text"
          onChange={handleChange}
          value={values.phone}
          error={errors.phone}
        />
        <div className="flex justify-center py-3">
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {title}
          </button>
        </div>
      </form>
    </FormLayout>
  );
};

UserForm.propTypes = {
  role: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired,
};
