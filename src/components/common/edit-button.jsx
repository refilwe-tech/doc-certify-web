import { LiaUserEditSolid } from "react-icons/lia";
import { UserService } from "../../services";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";

export const EditButton = (user) => {
  const onEdit = () => {
    UserService.updateUser(user)
      .then(() => {
        toast.success("Profile deleted successfully.", { duration: 3000 });
      })
      .catch((error) => {
        toast.error(error);
        toast.error("Failed to delete profile. Please try again.");
      });
  };
  return (
    <button
      className="text-primary hover:text-tertiary p-2 font-medium"
      onClick={onEdit}
    >
      <LiaUserEditSolid className="w-5 h-5" />
    </button>
  );
};

EditButton.propTypes = {
  user: PropTypes.object.isRequired,
};
