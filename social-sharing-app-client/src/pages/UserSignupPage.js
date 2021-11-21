import React from 'react';
import Input from "../components/Input";
import ButtonWithProgress from "../components/ButtonWithProgress";

class UserSignupPage extends React.Component {
  state = {
    displayName: '',
    username: '',
    password: '',
    passwordRepeat: '',
    pendingApiCall: false,
    errors: {},
    passwordRepeatConfirmed: true
  }

  onChangeDisplayName = (event) => {
    const errors = {...this.state.errors};
    delete errors.displayName;
    this.setState({
      errors: errors,
      displayName: event.target.value
    });
  }

  onChangeUsername = (event) => {
    const errors = {...this.state.errors};
    delete errors.username;
    this.setState({
      errors: errors,
      username: event.target.value
    });
  }

  onChangePassword = (event) => {
    const password = event.target.value;
    const passwordRepeatConfirmed = this.state.passwordRepeat === password;
    const errors = {...this.state.errors};
    delete errors.password;
    errors.passwordRepeat = passwordRepeatConfirmed ? ''
        : 'Passwords do not match'
    this.setState({
      password: password,
      passwordRepeatConfirmed: passwordRepeatConfirmed,
      errors: errors
    });
  }

  onChangePasswordRepeat = (event) => {
    const passwordRepeat = event.target.value;
    const passwordRepeatConfirmed = passwordRepeat === this.state.password;
    const errors = {...this.state.errors};
    errors.passwordRepeat = passwordRepeatConfirmed ? ''
        : 'Passwords do not match'
    this.setState({
      passwordRepeat: passwordRepeat,
      passwordRepeatConfirmed: passwordRepeatConfirmed,
      errors: errors
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
      this.setState({pendingApiCall: false}, ()=>{
        this.props.history.push("/");
      });
    })
    .catch(error => {
      let errors = {...this.state.errors};
      if (error.response.data && error.response.data.validationErrors) {
        errors = {...error.response.data.validationErrors}
      }
      this.setState({
        errors: errors,
        pendingApiCall: false
      });
    });
  }

  render() {
    return (
        <div className={"container"}>
          <h1 className={"text-center"}>Sign Up</h1>
          <div className={"col-12 mb-3"}>
            <Input placeholder={"Your display name"}
                   value={this.state.displayName}
                   onChange={this.onChangeDisplayName}
                   label={"Display Name"}
                   hasError={this.state.errors.displayName && true}
                   error={this.state.errors.displayName}
            />
          </div>
          <div className={"col-12 mb-3"}>
            <Input className={"form-control"}
                   placeholder={"Your username"}
                   value={this.state.username}
                   onChange={this.onChangeUsername}
                   label={"Username"}
                   hasError={this.state.errors.username && true}
                   error={this.state.errors.username}
            />
          </div>
          <div className={"col-12 mb-3"}>
            <Input className={"form-control"}
                   type={"password"}
                   value={this.state.password}
                   placeholder={"Your password"}
                   onChange={this.onChangePassword}
                   label={"Password"}
                   hasError={this.state.errors.password && true}
                   error={this.state.errors.password}
            />
          </div>
          <div className={"col-12 mb-3"}>
            <Input className={"form-control"}
                   type={"password"}
                   value={this.state.passwordRepeat}
                   placeholder={"Repeat your password"}
                   onChange={this.onChangePasswordRepeat}
                   label={"Repeat Password"}
                   hasError={this.state.errors.passwordRepeat && true}
                   error={this.state.errors.passwordRepeat}
            />
          </div>
          <div className={"text-center"}>
            <ButtonWithProgress
                disabled={this.state.pendingApiCall
                || !this.state.passwordRepeatConfirmed}
                className={"btn btn-primary"}
                onClick={this.onClickSignUp}
                displayText={"Sign Up"}
                showProgress={this.state.pendingApiCall}
            />
          </div>
        </div>
    );
  }
}

export default UserSignupPage;