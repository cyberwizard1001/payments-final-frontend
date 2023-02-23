import React, {useEffect, useState} from "react";
import Logo from "../assets/admin.png";
import {Link, useLocation} from "react-router-dom";
import ReorderIcon from '@mui/icons-material/Reorder';
import "../styles/Navbar.css";

function Navbar() {
    const [openLinks, setOpenLinks] = useState(false);

    const toggleNavbar = () => {
        setOpenLinks(!openLinks);
    };

    const [hideLinks, setLinks] = useState(false);

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/") {
            setLinks(false);
        }
        else {
            setLinks(true);
        }
    }, [location]);


    return (
        <div className="navbar">
            <div className="leftSide" id={openLinks ? "open" : "close"}>
                <img src={Logo}/>
                <h3 style={{color: "white", paddingLeft: "30px"}}> Admin </h3>

                {(hideLinks) ? <div className="hiddenLinks">
                    <Link to="/home"> Home </Link>
                    <Link to="/"> Logout </Link>
                </div> : null}

            </div>

            {(hideLinks) ? <div className="rightSide">
                <Link to="/home"> Home </Link>
                <Link to="/"> Logout </Link>
                <button onClick={toggleNavbar}>
                    <ReorderIcon/>
                </button>
            </div> : null}

        </div>
    );
}

export default Navbar;
