import { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import firebase from "../Config/firebaseConfig";
import UserContext from "../Contexts/UserContext";

import ViewProject from "../Components/ViewProject";
import DeliverProject from "../Components/DeliverProject";
import { toast } from "react-toastify";

const UserPanel = () => {
  const context = useContext(UserContext);
  const [project, setProject] = useState([]);

  useEffect(() => {
    if (context.user?.email) {
      context.showLoader();
      const projRef = firebase
        .database()
        .ref(`ProjectsInfo/${context.user?.uid}`);
      projRef.on("value", (response) => {
        const data = response.val();
        if (data) {
          setProject([data]);
        }
        context.hideLoader();
      });
    }
  }, [context.user?.email]);

  if (!context.user?.email) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="container-fluid mt-2">
        {!project?.length ? (
          <>
            <DeliverProject />
            {context.loader}
          </>
        ) : (
          <>
            <ViewProject projects={project} />

            <div
              className="container-fluid mt-2 ml-5"
              style={{ marginLeft: "25px" }}
            >
              <button
                className="btn btn-primary"
                onClick={() => {
                  setProject(null);
                  toast("Refill all the details again", {
                    type: "warning",
                    autoClose: 10000,
                  });
                }}
              >
                Reset Details <i class="fas fa-pen"></i>
              </button>
              <p
                style={{
                  color: "coral",
                  textAlign: "left",
                  marginRight: "25px",
                }}
              >
                Note: If you reset your project details then in case of checked
                project it will be unchecked again and marks alloted will be
                zero.
                <br />
              </p>
            </div>
            {context.loader}
          </>
        )}
      </div>
    </>
  );
};

export default UserPanel;
