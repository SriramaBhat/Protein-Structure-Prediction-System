import React, { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

import "./navigation.styles.scss"
import proteinLogo from "../../assets/images/protein-logo1.png";

const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <img src={proteinLogo} alt="Protein Logo" id="protein-logo" />
          <p>Protein Structure Predictor</p>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/signup">
            Signup
          </Link>
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
