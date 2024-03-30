import { Link } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import { LuUpload } from "react-icons/lu";
import { IoDocumentsOutline } from "react-icons/io5";
import { userStore } from "../../reducers";

export const AppNav = () => {
  const { logout } = userStore();
  return (
    <div className="bg-primary text-white h-full w-56 flex-shrink-0 p-4">
      <ul className="flex flex-col gap-4">
        <li>
          <Link
            to="/new-doc"
            className="flex items-center gap-2 hover:text-blue-500"
          >
            <LuUpload />
            Certify Docs
          </Link>
        </li>
        <li>
          <Link
            to="/docs"
            className="flex items-center gap-2 hover:text-blue-500"
          >
            <IoDocumentsOutline />
            My Docs
          </Link>
        </li>
        <li>
          <Link to="/profile" className="flex items-center hover:text-blue-500">
            <FiSettings className="mr-2" />
            My Account
          </Link>
        </li>
      </ul>

      <Link
        onClick={logout}
        to="/login"
        className="flex items-center absolute bottom-0 mb-6 hover:text-blue-500"
      >
        <CiLogout className="mr-2" />
        Logout
      </Link>
    </div>
  );
};
