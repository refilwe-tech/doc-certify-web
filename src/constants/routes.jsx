import { TbUsersGroup } from "react-icons/tb";
import { LuUpload } from "react-icons/lu";
import { IoDocumentsOutline } from "react-icons/io5";
import { FiSettings, FiBarChart2 } from "react-icons/fi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

export const ROUTES = {
  Sudo: [
    {
      name: "Admins",
      path: "/admins",
      icon: <MdOutlineAdminPanelSettings />,
    },
    {
      name: "Certifyees",
      path: "/users",
      icon: <TbUsersGroup />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <FiBarChart2 />,
    },
  ],
  Admin: [
    {
      name: "Admins",
      path: "/admins",
      icon: <MdOutlineAdminPanelSettings />,
    },
    {
      name: "Certifyees",
      path: "/users",
      icon: <TbUsersGroup />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <FiBarChart2 />,
    },
  ],
  Certifyee: [
    {
      name: "Certify Docs",
      path: "/new-doc",
      icon: <LuUpload />,
    },
    {
      name: "My Docs",
      path: "/docs",
      icon: <IoDocumentsOutline />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FiSettings />,
    },
  ],
};
