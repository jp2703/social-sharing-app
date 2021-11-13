import React from 'react';

class UserSignupPage extends React.Component {
  state = {
    displayName: '',
    username: '',
    password: '',
    passwordRepeat: '',
    pendingApiCall: false,
  }

  onChangeDisplayName = (event) => {
    this.setState({
      displayName: event.target.value
    });
  }

  onChangeUsername = (event) => {
    this.setState({
      username: event.target.value
    });
  }

  onChangePassword = (event) => {
    this.setState({
      password: event.target.value
    });
  }

  onChangePasswordRepeat = (event) => {
    this.setState({
      passwordRepeat: event.target.value
    });
  }

  onClickSignUp = () => {
    const user = {
      displayName: this.state.displayName,
      username: this.state.username,
      password: this.state.password,
    }
    this.setState({pendingApiCall: true});
    this.props.actions.postSignUp(user)
    .then(response => {
      this.setState({pendingApiCall: false});
    })
    .catch(error => {
      this.setState({pendingApiCall: false});
    });
  }

  render() {
    return (
        <div className={"container"}>
          <h1 className={"text-center"}>Sign Up</h1>
          <div className={"col-12 mb-3"}>
            <label>Display Name</label>
            <input className={"form-control"} placeholder={"Your display name"}
                   value={this.state.displayName}
                   onChange={this.onChangeDisplayName}/>
          </div>
          <div className={"col-12 mb-3"}>
            <label>Username</label>
            <input className={"form-control"} placeholder={"Your username"}
                   value={this.state.username}
                   onChange={this.onChangeUsername}/>
          </div>
          <div className={"col-12 mb-3"}>
            <label>Password</label>
            <input className={"form-control"} type={"password"}
                   value={this.state.password}
                   placeholder={"Your password"}
                   onChange={this.onChangePassword}/>
          </div>
          <div className={"col-12 mb-3"}>
            <label>Repeat password</label>
            <input className={"form-control"} type={"password"}
                   value={this.state.passwordRepeat}
                   placeholder={"Repeat your password"}
                   onChange={this.onChangePasswordRepeat}/>
          </div>
          <div className={"text-center"}>
            <button disabled={this.state.pendingApiCall}
                    className={"btn btn-primary"} onClick={this.onClickSignUp}>
              {this.state.pendingApiCall &&
                  <div
                       className="spinner-border text-light spinner-border-sm mr-2"
                       role="status"></div>
              }
              <span>Sign Up</span>
            </button>
          </div>
        </div>
    );
  }
}

export default UserSignupPage;