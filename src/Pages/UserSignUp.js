import { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import UserContext from "../Contexts/UserContext";

import firebase from "firebase/app";
import { toast } from "react-toastify";

const UserSignUp = () => {
  const context = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    context.showLoader();
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        context.setUser({ email: res.user.email, uid: res.user.uid });
        context.hideLoader();
      })
      .catch((error) => {
        toast(error.message, { type: "error", autoClose: 15000 });
        context.hideLoader();
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
  };

  if (context.user?.email) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="row cover">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div
            className="card m-4"
            style={{
              marginRight: "auto",
              marginLeft: "auto",
              marginTop: "5%",
            }}
          >
            <div
              className="card-body"
              style={{ paddingRight: "50px", paddingLeft: "50px" }}
            >
              <h4 className="card-title" style={{ textAlign: "center" }}>
                Sign Up Here
              </h4>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </form>
              <br />
              <p>
                Already have an account? <Link to="/userSignIn">Sign In</Link>
              </p>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
      {context.loader}
    </>
  );
};

export default UserSignUp;
