import React, { useState } from "react";
import Logo from "../assets/admin.png";
import { Link } from "react-router-dom";
import ReorderIcon from '@mui/icons-material/Reorder';
import "../styles/Navbar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };
  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img src={Logo} />
        <h3 style={{color: "white"}}> Admin </h3>
        <div className="hiddenLinks">
          <Link to="/home"> Home </Link>
          <Link to="/"> Logout </Link>
        </div>
      </div>
      <div className="rightSide">
        <Link to="/home"> Home </Link>
        <Link to="/"> Logout </Link>
        <button onClick={toggleNavbar}>
          <ReorderIcon />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
