import { useContext, useEffect, useState } from "react";
import UserContext from "../Contexts/UserContext";
import { Redirect } from "react-router-dom";
import firebase from "../Config/firebaseConfig";
import ViewProject from "../Components/ViewProject";

const AdminPanel = () => {
  const context = useContext(UserContext);
  const [projects, setProjects] = useState([]);
  const [sortByChecked, setSortByChecked] = useState(true);
  const [evaluated, setEvaluated] = useState(0);

  useEffect(() => {
    if (context.isAdmin) {
      context.showLoader();
      const projRef = firebase.database().ref(`ProjectsInfo/`);
      projRef.on("value", (response) => {
        const data = response.val();
        if (data) {
          let unCheckdedProjects = [];
          let checkedProjects = [];
          let updatedProjectsArray = [];
          let marked = 0;
          for (let id in data) {
            if (data[id].Checked) {
              checkedProjects = [...checkedProjects, data[id]];
              marked++;
            } else {
              unCheckdedProjects = [...unCheckdedProjects, data[id]];
            }
          }
          if (sortByChecked) {
            updatedProjectsArray = [...checkedProjects, ...unCheckdedProjects];
          } else {
            updatedProjectsArray = [...unCheckdedProjects, ...checkedProjects];
          }

          setEvaluated(marked);
          setProjects(updatedProjectsArray);
        }
      });
      context.hideLoader();
    }
  }, [context.isAdmin, sortByChecked]);

  if (!context.isAdmin) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {projects.length ? (
        <>
          <div
            className="row container mx-auto p-5"
            style={{ boxSizing: "border-box" }}
          >
            <div className="col-md-3 col-sm-4" style={{ padding: "2px" }}>
              <button type="button" className="btn btn-primary">
                Submissions
                <span className="badge bg-secondary">{projects.length}</span>
              </button>
            </div>
            <div className="col-md-3 col-sm-4" style={{ padding: "2px" }}>
              <button type="button" className="btn btn-primary">
                Evaluated
                <span className="badge bg-secondary">{evaluated}</span>
              </button>
            </div>
            <div className="col-md-3 col-sm-4" style={{ padding: "2px" }}>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault1"
                  onChange={() => setSortByChecked(!sortByChecked)}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault1"
                  style={{ fontWeight: "bold", fontSize: "1rem" }}
                >
                  Group By Unchecked
                </label>
              </div>
            </div>
            <div className="col-md-3 col-sm-4" style={{ padding: "2px" }}></div>
          </div>
          <ViewProject projects={projects} />
          {context.loader}
        </>
      ) : (
        <>
          <h1 style={{ color: "purple", textAlign: "center", paddingTop: 20 }}>
            No record found
          </h1>
          {context.loader}
        </>
      )}
    </>
  );
};

export default AdminPanel;
