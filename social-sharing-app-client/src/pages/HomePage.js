import React from 'react';
import UserList from "../components/UserList";

export class HomePage extends React.Component {
  state = {

  }

  render() {
    return (
        <div>
          <UserList/>
        </div>
    );
  }

}

export default HomePage;