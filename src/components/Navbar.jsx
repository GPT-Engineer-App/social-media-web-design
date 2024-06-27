import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <div>
        <Link to="/" className="mr-4">
          Home
        </Link>
        <Link to="/about" className="mr-4">
          About
        </Link>
        <Link to="/contact" className="mr-4">
          Contact
        </Link>
      </div>
      <div>
        {auth.currentUser ? (
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Link to="/login" className="mr-4">
              Login
            </Link>
            <Link to="/register" className="mr-4">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;