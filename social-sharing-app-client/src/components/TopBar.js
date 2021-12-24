import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";

export class TopBar extends React.Component {
  state = {}

  onClickLogout = () => {
    const action = {
      type: "logout-success"
    }
    this.props.dispatch(action);
  }

  render() {

    let links = (
        <ul className={"nav navbar-nav ml-auto"}>
          <li className={"nav-item "}>
            <Link className="nav-link active" to="/signup">Sign Up</Link>
          </li>
          <li className={"nav-item "}>
            <Link className="nav-link active" to="/login">Login</Link>
          </li>
        </ul>
    );

    if (this.props.user.isLoggedIn) {
      links = (
          <ul className={"nav navbar-nav ml-auto"}>
            <li className={"nav-item"}>
              <Link className="nav-link active"
                    style={{cursor: "pointer"}}
                    to="/login"
                    onClick={this.onClickLogout}>Logout</Link>
            </li>
            <li className={"nav-item"}>
              <Link className="nav-link active"
                    to={`/users/${this.props.user.username}`}>
                My Profile
              </Link>
            </li>
          </ul>
      );
    }

    return (
        <div className={"container"}>
          <nav className="navbar navbar-expand navbar-light bg-light">
            <Link className="navbar-brand" to="/">Social Sharing</Link>
            {links}
          </nav>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state
  }
}

export default connect(mapStateToProps)(TopBar);