import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import firebase from "../Config/firebaseConfig";
import UserContext from "../Contexts/UserContext";

const ViewProject = ({ projects }) => {
  const context = useContext(UserContext);
  const [projectMarks, setProjectMarks] = useState(null);

  const handleCheck = async (project) => {
    if (context.isAdmin) {
      context.showLoader();
      await firebase
        .database()
        .ref(`ProjectsInfo/${project?.ProjectKey}/Checked`)
        .set(!project?.Checked);
    }
    context.hideLoader();
  };

  const handleMarks = async (project) => {
    if (isNaN(projectMarks))
      return toast("Please fill valid marks", { type: "error" });
    if (context.isAdmin) {
      context.showLoader();
      await firebase
        .database()
        .ref(`ProjectsInfo/${project?.ProjectKey}/Marks`)
        .set(projectMarks);
    }
    context.hideLoader();
  };

  return (
    <>
      <div
        className="row container-fluid mx-auto"
        style={{ boxSizing: "border-box" }}
      >
        <div className="col-md-12">
          <div
            className="list-group viewProject"
            style={{ boxSizing: "border-box" }}
          >
            {projects.map((project) => (
              <div key={project?.ProjectKey}>
                <div className="list-group-item projectName d-flex justify-content-between">
                  <div>
                    <input
                      onClick={() => handleCheck(project)}
                      className="form-check-input me-1"
                      type="checkbox"
                      value=""
                      checked={project?.Checked}
                      readOnly={context.isAdmin}
                    />
                    {project?.ProjectName}
                    <i
                      className="fas fa-caret-right"
                      style={{ cursor: "pointer", marginLeft: 5 }}
                      data-bs-toggle={context.isAdmin ? "collapse" : null}
                      aria-expanded="false"
                      aria-controls={`A${project?.ProjectKey}`}
                      data-bs-target={`#A${project?.ProjectKey}`}
                    ></i>
                  </div>
                  <small className="text-muted">
                    <i class="fas fa-clock"></i> {project?.DeliveryTime}
                  </small>
                </div>
                <div />
                <div className="row">
                  <div className="col-md-12">
                    <div
                      className={
                        context.isAdmin ? "list-group collapse" : "list-group"
                      }
                      id={`A${project?.ProjectKey}`}
                    >
                      <div
                        className="list-group-item list-group-item-action"
                        style={{ backgroundColor: "#f8f9fa" }}
                      >
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">
                            <a
                              rel="noreferrer"
                              target="_blank"
                              style={{ textDecoration: "none" }}
                              href={project?.LiveProjectLink}
                            >
                              Live Link <i class="fas fa-external-link-alt"></i>
                            </a>
                          </h5>
                          <h5 className="mb-1">
                            <h5>Marks Allotted: {project?.Marks}</h5>
                          </h5>
                        </div>
                        <h6>
                          <a
                            rel="noreferrer"
                            target="_blank"
                            style={{ textDecoration: "none" }}
                            href={project?.GithubProjectLink}
                          >
                            Github Link <i class="fas fa-external-link-alt"></i>
                          </a>
                        </h6>
                        <div className="viewTags">
                          <small className="text-muted members">
                            <h5>Group Members</h5>
                            {project?.Members.map((member) => (
                              <p key={project.ProjectKey}>{member?.value}</p>
                            ))}
                          </small>
                          <small className="text-muted techs">
                            <h5>Technologies Used</h5>
                            {project?.TechUsed.map((tech) => (
                              <p key={project.ProjectKey}>{tech?.value}</p>
                            ))}
                          </small>
                          {context.isAdmin ? (
                            <>
                              <small className="text-muted techs">
                                <div className="row">
                                  <div className="col-md-6">
                                    <h5>Deliver Marks</h5>
                                  </div>
                                  <div>
                                    <div className="input-group mb-3">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Marks"
                                        aria-describedby="button-addon2"
                                        onChange={(e) =>
                                          setProjectMarks(e.target.value)
                                        }
                                        value={projectMarks}
                                      />
                                      <button
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        id="button-addon2"
                                        onClick={() => handleMarks(project)}
                                      >
                                        Deliver
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </small>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {context.loader}
    </>
  );
};

export default ViewProject;
