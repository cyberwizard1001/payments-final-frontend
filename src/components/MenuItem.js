import React from "react";
import { Link } from "react-router-dom";

function MenuItem({ image, name, price }) {
  return (
    <Link to="/about">
    <div className="menuItem">
      <div style={{ backgroundImage: `url(${image})` }}> </div>
      <h1> {name} </h1>
    </div>
    </Link>
  );
}

export default MenuItem;
