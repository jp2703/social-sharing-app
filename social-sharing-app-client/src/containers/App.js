import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import LoginPage from "../pages/LoginPage";
import UserSignupPage from "../pages/UserSignupPage";
import TopBar from "../components/TopBar";
import React from "react";
import {Route, Switch} from "react-router-dom";

function App() {
  return (
      <div className={"container"}>
        <TopBar/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/signup" component={UserSignupPage}/>
          <Route exact path="users/:username" component={UserPage}/>
        </Switch>
      </div>
  );
}

export default App;
