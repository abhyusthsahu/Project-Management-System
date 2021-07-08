import { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../Contexts/UserContext";

import firebase from "firebase/app";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const context = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    context.showLoader();
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        context.setIsAdmin(res.user.uid === "WXhKTAVU8IMlGVzgpV78DR0b2ET2");
        context.hideLoader();
      })
      .catch((error) => {
        toast(error.message, { type: "error", autoClose: 15000 });
        context.hideLoader();
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignIn();
  };

  if (context.isAdmin) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="row cover">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div className="">
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
                  Login Here
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
                    Log In
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
      {context.loader}
    </>
  );
};

export default AdminLogin;
