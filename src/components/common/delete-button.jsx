import { GoTrash } from "react-icons/go";
import { UserService } from "../../services";
import { toast } from "react-hot-toast";
import PropTypes from "prop-types";

export const DeleteButton = ({ id, userType }) => {
  const onDelete = () => {
    UserService.deleteUser(id, userType)
      .then(() => {
        toast.success("Profile deleted successfully.", { duration: 3000 });
      })
      .catch((error) => {
        toast.error(error);
        toast.error("Failed to delete profile. Please try again.");
      });
  };

  return (
    <button onClick={onDelete}>
      <GoTrash className="hover:text-red-500" />
    </button>
  );
};

DeleteButton.propTypes = {
  id: PropTypes.number.isRequired,
  userType: PropTypes.string.isRequired,
};
