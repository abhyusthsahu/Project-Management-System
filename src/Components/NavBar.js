import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import logo from "../Images/manitlogo.png";

const NavBar = () => {
  const context = useContext(UserContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="#">
          <img
            src={logo}
            className="img-thumbnail mx-auto d-block"
            alt="i-Manage"
            style={{
              height: "5rem",
              width: "5rem",
              borderRadius: "100%",
              border: "3.5px solid #a7c957",
            }}
          />
        </Link>

        <Link className="navbar-brand" to="/">
          <i class="fas fa-home" style={{ color: "#a7c957" }}></i>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <div className="d-flex">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {context.isAdmin || context.user?.email ? (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    onClick={() => {
                      context.setUser(null);
                      context.setIsAdmin(0);
                    }}
                  >
                    Logout <i className="fas fa-sign-out-alt"></i>
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/adminLogin">
                      Admin <i className="fas fa-user"></i>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/userSignIn">
                      User <i className="fas fa-users"></i>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
