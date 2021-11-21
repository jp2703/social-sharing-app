import {HomePage} from "../pages/HomePage";
import {UserPage} from "../pages/UserPage";
import {LoginPage} from "../pages/LoginPage";
import {Route, Switch} from "react-router-dom";
import UserSignupPage from "../pages/UserSignupPage";
import * as apiCalls from "../api/apiCalls";
import TopBar from "../components/TopBar";

const actions = {
  postSignUp: apiCalls.signUp,
  postLogin: apiCalls.login
}

function App() {
  return (
      <div className={"container"}>
        <TopBar/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/login" component={(props) => <LoginPage {...props} actions={actions}/>}/>
          <Route exact path="/signup" component={(props) => <UserSignupPage {...props} actions={actions}/>}/>
          <Route exact path="users/:username" component={() => <UserPage/>}/>
        </Switch>
      </div>
  );
}

export default App;
