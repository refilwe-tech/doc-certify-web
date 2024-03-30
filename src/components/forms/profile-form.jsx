import { useFormik } from "formik";
import { FormLayout } from "../layouts";
import { InputField } from "../common";
import { useState } from "react";
import { UserService } from "../../services";
import toast from "react-hot-toast";
import { userStore } from "../../reducers";
import { LiaUserEditSolid } from "react-icons/lia";
import { AiOutlineUserDelete } from "react-icons/ai";

export const ProfileForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { user } = userStore();
  const {
    firstName,
    lastName,
    email,
    username,
    roleID,
    password,
    userID,
    phone,
  } = user;
  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      roleID: roleID,
      password: "",
      phone: user.phone,
    },

    onSubmit: (values) => {
      UserService.updateUser(value)
        .then(() => {
          toast.success("Profile updated successfully.");
        })
        .catch((error) => {
          toast.error(error);
          toast.error("Failed to update to profile. Please try again.");
        });
    },
  });

  return (
    <FormLayout>
      <>
        <section className="flex justify-center items-center">
          <img
            src={`https://eu.ui-avatars.com/api/?name=${firstName}+${lastName}`}
            alt="profile"
            className="w-32 h-32 rounded-full"
          />
        </section>
        <section className="flex flex-col gap-2 px-10">
          <h1 className="text-2xl font-semibold text-center py-2">{`${firstName} ${lastName}`}</h1>
          <section className="flex justify-between">
            <p className="item-center self-center">
              Update your profile information
            </p>
            <section className="flex items-center gap-2 self-end">
              <button
                className="text-white rounded-lg py-2 px-3 font-medium bg-red-600 flex items-center gap-2"
                onClick={() => setIsDeleting(!isDeleting)}
              >
                Delete <AiOutlineUserDelete className="w-5 h-5" />{" "}
              </button>
              |{" "}
              <button
                className="hover:text-primary flex  bg-primary hover:bg-white text-white items-center gap-2 hover:border hover:border-primary rounded-lg py-2 px-3 font-medium"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit"}
                <LiaUserEditSolid className="w-5 h-5" />
              </button>
            </section>
          </section>
        </section>
      </>
      <form className="py-2 px-10" onSubmit={handleSubmit}>
        <InputField
          disabled={!isEditing}
          label="First Name"
          placeholder="First Name"
          name="firstName"
          type="text"
          onChange={handleChange}
          value={firstName}
        />
        <InputField
          disabled={!isEditing}
          label="Last Name"
          placeholder="Last Name"
          name="lastName"
          type="text"
          onChange={handleChange}
          value={lastName}
        />
        <InputField
          disabled={!isEditing}
          label="Email"
          placeholder="Email"
          name="email"
          type="text"
          onChange={handleChange}
          value={email}
        />
        <InputField
          disabled={!isEditing}
          placeholder="Password"
          label="Password"
          name="password"
          type="password"
          onChange={handleChange}
          value={password}
        />
        <InputField
          disabled={!isEditing}
          placeholder="Phone Number"
          label="Phone Number"
          name="phone"
          type="phone"
          onChange={handleChange}
          value={phone}
        />
        {isEditing && (
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/4 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Details
            </button>
          </div>
        )}
      </form>
    </FormLayout>
  );
};
