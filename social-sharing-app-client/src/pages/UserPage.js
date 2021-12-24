import React from 'react';
import {getUser} from "../api/apiCalls";
import ProfileCard from "../components/ProfileCard";

export class UserPage extends React.Component {
  state = {
    user: undefined,
    userNotFound: false,
    isLoadingUser: false
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser = () => {
    const username = this.props.match.params.username;
    if (!username) {
      return;
    }
    this.setState({userNotFound: false, isLoadingUser: true});
    getUser(username)
    .then(response => {
      this.setState({user: response.data, isLoadingUser: false});
    })
    .catch(error => {
      this.setState({
        userNotFound: true,
        isLoadingUser: false
      })
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.username !== this.props.match.params.username
        || prevState.userNotFound) {
      this.loadUser();
    }
  }

  render() {
    if (this.state.isLoadingUser) {
      return (
          <div>
            <div className="spinner-border spinner-border mr-2 d-flex m-auto mt-5"
                 role="status"/>
          </div>
      );
    }

    if (this.state.userNotFound) {
      return (
          <div className={"alert alert-danger text-center m-5"} role={"alert"}>
            <div className={"alert-heading"}>
              <i className={"fas fa-exclamation-triangle"}></i>
            </div>
            <h3>User not found.</h3>
          </div>
      );
    }

    return (
        <div className={"container d-flex justify-content-center"}>
          {this.state.user &&
          <ProfileCard width={"400px"} height={"400px"} user={this.state.user}/>
          }
        </div>
    );
  }
}

UserPage.defaultProps = {
  match: {
    params: {}
  }
}

export default UserPage;