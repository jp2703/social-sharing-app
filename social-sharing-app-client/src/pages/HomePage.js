import React from 'react';
import UserList from "../components/UserList";
import {connect} from "react-redux";

export class HomePage extends React.Component {
  state = {

  }

  render() {
    if(this.props.user.isLoggedIn){
      return (
          <div>
            <UserList/>
          </div>
      );
    } else {
      return (
          <div>
          </div>
      );
    }
  }

}

const mapStateToProps = (state) => {
  return {
    user: state
  }
}

export default connect(mapStateToProps)(HomePage);