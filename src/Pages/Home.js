import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../Contexts/UserContext";

const Home = () => {
  const context = useContext(UserContext);
  if (context.isAdmin) {
    return <Redirect to="/admin/adminPanel" />;
  } else if (context.user?.email) {
    return <Redirect to="/user/userPanel" />;
  }
  return (
    <div className="homeBackground">
      <div className="homeContent">
        <h1>Project Management Application</h1>
      </div>
    </div>
  );
};

export default Home;
