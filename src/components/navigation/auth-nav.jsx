import { Link } from "react-router-dom";
import { LogoIcon } from "../../assets";
import { userStore } from "../../reducers";

export const AuthNav = () => {
  const { user } = userStore();
  const { firstName, lastName } = user;
  return (
    <nav className="flex justify-between bg-white drop-shadow-xl">
      <Link to="/">
        <img src={LogoIcon} className="h-14" alt="logo" />
      </Link>
      <Link
        to="/profile"
        className="flex px-3 items-center hover:text-blue-500"
      >
        <img
          src={`https://eu.ui-avatars.com/api/?name=${firstName}+${lastName}&background=1E2D40&color=fff`}
          alt="profile"
          className="w-8 h-8 rounded-full"
        />
      </Link>
    </nav>
  );
};
