import React from 'react';
import {Link} from "react-router-dom";

export class TopBar extends React.Component {
  state = {}

  render() {
    return (
        <div className={"container"}>
          <nav className="navbar navbar-expand navbar-light bg-light">
            <Link className="navbar-brand" to="/">Social Sharing</Link>
            <ul className={"nav navbar-nav ml-auto"}>
              <Link className="nav-item nav-link active" to="/">Home</Link>
              <Link className="nav-item nav-link active" to="/signup">Sign Up</Link>
              <Link className="nav-item nav-link active" to="/login">Login</Link>
            </ul>
          </nav>
        </div>
    );
  }

}

export default TopBar;