import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";

const Header = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <header className="bg-white shadow p-3">
      <div>
        <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
          <div>
            <h1 className="text-2xl font-bold">
              Employ<span className="text-[#F83002]">Wise</span>
            </h1>
          </div>
          <div className="flex items-center gap-12">
            <ul className="flex font-medium items-center gap-5">
              {token && (
                <nav className="flex space-x-4">
                  <Link
                    to="/users"
                    className="text-gray-600 hover:text-gray-900 cursor-pointer"
                  >
                    Users
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-gray-900 cursor-pointer"
                  >
                    Logout
                  </button>
                </nav>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
