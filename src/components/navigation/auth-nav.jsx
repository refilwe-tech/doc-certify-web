import React from "react";

export const AuthNav = () => {
  return (
    <nav className="flex justify-evenly">
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </Link>
        <Link>
          <a to="/register">Register</a>
        </Link>
      </ul>
    </nav>
  );
};
