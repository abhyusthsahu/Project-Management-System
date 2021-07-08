import React, { useState } from "react";

//Routing
import { Switch, Route } from "react-router-dom";

//Bootstrap + Manual Css
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//Components
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import AdminLogin from "./Pages/AdminLogin";
import AdminPanel from "./Pages/AdminPanel";
import UserSignIn from "./Pages/UserSignIn";
import UserPanel from "./Pages/UserPanel";
import UserSignUp from "./Pages/UserSignUp";
import NotFound from "./Pages/NotFound";

//Contexts
import UserContext from "./Contexts/UserContext";

//toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

//Created Hooks
import usePageLoader from "./Components/UsePageLoader";

const App = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(0);
  const [loader, showLoader, hideLoader] = usePageLoader();
  return (
    <>
      <ToastContainer />
      <UserContext.Provider
        value={{
          user,
          setUser,
          isAdmin,
          setIsAdmin,
          loader,
          showLoader,
          hideLoader,
        }}
      >
        <NavBar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/adminLogin" component={AdminLogin} />
          <Route path="/admin/adminPanel" component={AdminPanel} />
          <Route path="/userSignIn" component={UserSignIn} />
          <Route path="/user/userPanel" component={UserPanel} />
          <Route path="/userSignUp" component={UserSignUp} />
          <Route path="*" component={NotFound} />
        </Switch>
      </UserContext.Provider>
    </>
  );
};

export default App;
