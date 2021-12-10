import React from "react";
import * as apiCalls from '../api/apiCalls';
import UserListItem from "./UserListItem";

class UserList extends React.Component {
  state = {
    page: {
      content: [],
      number: 0,
      size: 3,
      last: false,
      first: true
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = (requestedPage = 0) => {
    apiCalls.listUsers(
        {page: requestedPage, size: this.state.page.size})
    .then((response) => {
      this.setState({
        page: response.data,
        loadError: undefined
      })
    })
    .catch(error => {
      this.setState({
        loadError: 'User load failed'
      });
    });
  }

  onClickNext = () => {
    this.loadData(this.state.page.number + 1);
  }

  onClickPrevious = () => {
    this.loadData(this.state.page.number - 1);
  }

  render() {
    return (
        <div className={"card"}>
          <h3 className={"card-title m-auto"}>Users</h3>
          <div className={"list-group list-group-flush"}>
            {
              this.state.page.content.map((user) => {
                return (
                    <UserListItem key={user.username} user={user}/>
                );
              })
            }
          </div>
          <div>
          </div>
          <div className="btn-group">
            {!this.state.page.first && (
                <button onClick={this.onClickPrevious}
                        style={{cursor: 'pointer'}}
                        className={"btn btn-light m-1 float-right"}>
                  {`< previous`}
                </button>
            )
            }
            {!this.state.page.last && (
                <button onClick={this.onClickNext} style={{cursor: 'pointer'}}
                        className={"btn btn-light m-1 float-right"}>
                  next >
                </button>
            )
            }
          </div>
          {this.state.loadError &&
          <span className={"text-center text-danger"}>{this.state.loadError}</span>
          }
        </div>
    );
  }
}

export default UserList;