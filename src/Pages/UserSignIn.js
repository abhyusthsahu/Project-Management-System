import { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";

import UserContext from "../Contexts/UserContext";

import firebase from "../Config/firebaseConfig";
import { toast } from "react-toastify";

const UserSignIn = () => {
  const context = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");

  const handleSignIn = async () => {
    context.showLoader();
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        context.setUser({ email: res.user.email, uid: res.user.uid });
        context.hideLoader();
      })
      .catch((error) => {
        toast(error.message, { type: "error", autoClose: 15000 });
        context.hideLoader();
      });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (forgotEmail)
      firebase
        .auth()
        .sendPasswordResetEmail(forgotEmail)
        .then(toast("Email has been sent succesfully !", { type: "success" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignIn();
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
                Sign In Here
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
                  Sign In
                </button>
              </form>
              <br />
              <p>
                <div className="row">
                  <div className="col-md-6">
                    Didn't have account? <Link to="/userSignUp">Sign Up</Link>
                  </div>
                  <div className="col-md-6">
                    <Link
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      data-bs-whatever="@mdo"
                    >
                      forgotten password ?
                    </Link>

                    <div
                      class="modal fade"
                      id="exampleModal"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                              A password reset link will be sent to your given
                              mail !
                            </h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <form>
                              <label htmlFor="email" className="form-label">
                                Email
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={forgotEmail}
                                onChange={(e) => setForgotEmail(e.target.value)}
                              />
                            </form>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-primary"
                              data-bs-dismiss="modal"
                              onClick={(e) => {
                                handleForgotPassword(e);
                              }}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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

export default UserSignIn;
