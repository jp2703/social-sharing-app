import React from 'react';
import {getUser} from "../api/apiCalls";
import ProfileCard from "../components/ProfileCard";
import {connect} from "react-redux";
import * as apiCalls from "../api/apiCalls";

export class UserPage extends React.Component {
  state = {
    user: undefined,
    userNotFound: false,
    isLoadingUser: false,
    isUpdatingUser: false,
    inEditMode:false,
    updatedDisplayName:undefined
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

  onClickEdit = () =>{
    this.setState({
      inEditMode:true
    })
  }

  onClickCancel = () =>{
    this.setState({
      inEditMode:false,
      updatedDisplayName:undefined
    })
  }

  onUpdateDisplayName = (event) =>{
    this.setState({
      updatedDisplayName:event.target.value
    })
  }

  onClickSave = (id, body) =>{
    this.setState({
      isUpdatingUser: true
    });
    apiCalls.updateUser(id, body)
    .then(response=>{
      this.setState({
        inEditMode:false,
        isUpdatingUser: false,
        updatedDisplayName:undefined
      });
      this.loadUser();
    })
    .catch(error=>{
      this.setState({
        inEditMode:false,
        isUpdatingUser: false,
        updatedDisplayName:undefined
      });
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
          <ProfileCard
              width={"500px"}
              height={"550px"}
              user={this.state.user}
              editable={this.props.user.username===this.state.user.username}
              inEditMode={this.state.inEditMode}
              onClickEdit={this.onClickEdit}
              onClickCancel={this.onClickCancel}
              onClickSave={this.onClickSave}
              onUpdateDisplayName={this.onUpdateDisplayName}
              updatedDisplayName={this.state.updatedDisplayName}
              isUpdatingUser={this.state.isUpdatingUser}
          />
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

const mapStateToProps = (state) => {
  return {
    user: state
  }
}

export default connect(mapStateToProps)(UserPage);