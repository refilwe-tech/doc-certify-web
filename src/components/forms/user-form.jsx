import { useFormik } from "formik";
import { FormLayout } from "../layouts";
import { InputField } from "../common";
import { AuthService } from "../../services";
import toast from "react-hot-toast";
import * as Yup from "yup";

export const UserForm = ({ role }) => {
  const generateUsername = (firstName, lastName) => {
    const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${Math.floor(
      Math.random() * 100
    )}`;
    return username;
  };

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
  });

  const { handleSubmit, handleChange, values, setFieldError, errors } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        roleID: 3,
        password: "",
        phone: "",
      },
      validationSchema: registrationSchema,
      onSubmit: (values) => {
        const newValues = values;
        newValues.username = generateUsername(
          values.firstName.slice(0, 3),
          values.lastName.slice(0, 4)
        );
        AuthService.register(newValues)
          .then(() => {
            toast.success("Account created successfully. Please login.", {
              duration: 3000,
            });

            setTimeout(() => {
              window.location.href = "/login";
            }, 2000);
          })
          .catch(({ response }) => {
            const { error } = response.data;
            const { email, phone } = error;
            setFieldError("email", email);
            setFieldError("phone", phone);
            toast.error(email ? email : phone, { duration: 3000 });
            toast.error("Failed to create account. Please try again.");
          });
      },
    });

  return (
    <FormLayout>
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
          type="phone"
          onChange={handleChange}
          value={values.phone}
          error={errors.phone}
        />
        <div className="flex justify-center py-3">
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add {role}
          </button>
        </div>
      </form>
    </FormLayout>
  );
};
