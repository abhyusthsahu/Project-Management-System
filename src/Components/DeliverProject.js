import { useContext, useState } from "react";
import UserContext from "../Contexts/UserContext";
import Tags from "../Components/Tags";
import firebase from "../Config/firebaseConfig";
import { toast } from "react-toastify";

const DeliverProject = () => {
  const context = useContext(UserContext);

  const [projName, setProjName] = useState("");
  const [members, setMembers] = useState([]);
  const [techUsed, setTechUsed] = useState([]);
  const [liveProjLink, setLiveProjLink] = useState("");
  const [githubProjLink, setGithubProjLink] = useState("");

  const handleProjSubmit = async (e) => {
    e.preventDefault();
    const today = new Date();
    if (projName && members.length && techUsed.length && githubProjLink) {
      context.showLoader();
      await firebase
        .database()
        .ref(`ProjectsInfo/${context.user?.uid}`)
        .set({
          ProjectKey: context.user?.uid,
          ProjectName: projName,
          Members: members,
          TechUsed: techUsed,
          LiveProjectLink: liveProjLink,
          GithubProjectLink: githubProjLink,
          DeliveryTime: `${today.getDate()}-${
            today.getMonth() + 1
          }-${today.getFullYear()}`,
          DeliveryDate: today.getDate(),
          DeliveryMonth: today.getMonth() + 1,
          DeliveryYear: today.getFullYear(),
          Checked: false,
          Marks: 0,
        });
      context.hideLoader();
      toast("Project Delivered", { type: "success", autoClose: 10000 });
    } else {
      toast("Please fill all the details", { type: "error", autoClose: 10000 });
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="container FormMain">
            <h1>Deliver Your Beuatiful Project Here...</h1>
            <form className="row g-3">
              <div className="col-md-2"></div>
              <div className="col-md-8">
                <label htmlFor="projName" className="form-label">
                  Project Name
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="projName"
                  placeholder="Project Name"
                  value={projName}
                  onChange={(e) => {
                    setProjName(e.target.value);
                  }}
                />
                <br />
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="scholarId" className="form-label">
                      Scholar Id
                    </label>
                    <Tags
                      buttonValue="add member"
                      placeholder="Enter Scholar Id"
                      inputLabel="Scholar Id"
                      ID="scholarId"
                      setTagList={(scholarList) => {
                        setMembers(scholarList);
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="techUsed" className="form-label">
                      Technologies Used
                    </label>
                    <Tags
                      buttonValue="add tech"
                      placeholder="Enter Tech Name"
                      inputLabel="Tech Used"
                      ID="techUsed"
                      setTagList={(techList) => {
                        setTechUsed(techList);
                      }}
                    />
                  </div>
                </div>
                <br />
                <label htmlFor="githubLink" className="form-label">
                  Github Link
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="githubLink"
                  placeholder="Github Link Address"
                  value={githubProjLink}
                  onChange={(e) => {
                    setGithubProjLink(e.target.value);
                  }}
                />
                <br />
                <label htmlFor="liveLink" className="form-label">
                  Live Link (optional)
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="liveLink"
                  placeholder="Live Link Address"
                  value={liveProjLink}
                  onChange={(e) => {
                    setLiveProjLink(e.target.value);
                  }}
                />
                <br />
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={(e) => {
                      handleProjSubmit(e);
                    }}
                  >
                    Deliver Your Project
                  </button>
                </div>
              </div>
            </form>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>
      {context.loader}
    </>
  );
};

export default DeliverProject;
