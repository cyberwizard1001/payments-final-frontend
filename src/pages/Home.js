import React from "react";
import Billers from "../assets/biller.png";
import Vendors from "../assets/vendors.png";
import Items from "../assets/items.png";
import {Link} from "react-router-dom";
import "../styles/Home.css";

function Menu() {
    return (
        <div className="menu">
            <h1 className="menuTitle">Welcome</h1>
            <div className="menuList">
                <Link to="/billers">
                    <div className="menuItem">
                        <div style={{backgroundImage: `url(${Billers})`}}/>
                        <h1> Billers </h1>
                    </div>
                </Link>

                <Link to="/vendors">
                    <div className="menuItem">
                        <div style={{backgroundImage: `url(${Vendors})`}}/>
                        <h1> Vendors </h1>
                    </div>
                </Link>

                <Link to="/orders">
                    <div className="menuItem">
                        <div style={{backgroundImage: `url(${Items})`}}/>
                        <h1> Orders </h1>
                    </div>
                </Link>

            </div>
        </div>
    );
}

export default Menu;
