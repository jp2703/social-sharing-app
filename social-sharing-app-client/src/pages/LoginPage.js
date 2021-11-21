import React from 'react';
import Input from "../components/Input";
import ButtonWithProgress from "../components/ButtonWithProgress";

export class LoginPage extends React.Component {
  state = {
    username: '',
    password: '',
    errors: {},
    loginFailed: false,
    pendingApiCall: false
  }

  onChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
      loginFailed: false
    });
  }

  onChangePassword = (event) => {
    this.setState({
      password: event.target.value,
      loginFailed: false
    });
  }

  onClickLogin = () => {
    const user = {
      username: this.state.username,
      password: this.state.password,
    }
    this.setState({pendingApiCall: true});
    this.props.actions.postLogin(user)
    .then(response => {
      this.setState({pendingApiCall: false}, () => {
        this.props.history.push("/");
      });
    })
    .catch(error => {
      let errors = {...this.state.errors};
      if (error.response.data && error.response.data.message) {
        errors = {message: error.response.data.message}
      }
      this.setState({
        errors: errors,
        loginFailed: true,
        pendingApiCall: false
      });
    });
  }

  render() {
    let usernameOrPasswordEmpty = this.state.username.length === 0
        || this.state.password.length === 0;

    return (
        <div className={"container"}>
          <h1 className={"text-center"}>Login</h1>
          <div className={"col-12 mb-3"}>
            <Input className={"form-control"}
                   placeholder={"Your username"}
                   value={this.state.username}
                   onChange={this.onChangeUsername}
                   label={"Username"}
            />
          </div>
          <div className={"col-12 mb-3"}>
            <Input className={"form-control"}
                   type={"password"}
                   value={this.state.password}
                   placeholder={"Your password"}
                   onChange={this.onChangePassword}
                   label={"Password"}
            />
          </div>
          <div className={"text-center"}>
            <ButtonWithProgress
                disabled={this.state.pendingApiCall || usernameOrPasswordEmpty}
                className={"btn btn-primary"}
                onClick={this.onClickLogin}
                displayText={"Login"}
                showProgress={this.state.pendingApiCall}
            />
          </div>
          {this.state.loginFailed &&
          <div className="alert alert-danger text-center mt-4" role="alert">
            {this.state.errors.message}
          </div>
          }
        </div>
    );
  }

}

export default LoginPage;