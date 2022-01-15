import React from 'react';
import {Link} from "react-router-dom";
import ProfileImage from "./ProfileImage";

const UserListItem = (props) => {
  return (
      <Link to={`/users/${props.user.username}`} className={"list-group-item list-group-item-action mt-1 rounded border border-light"}>
        <ProfileImage image={props.user.image} className={"rounded-circle border border-dark"} alt={"profile"} width={32} height={32}/>
        <span className={"pl-2 m-2"}>
          {props.user.displayName} - {props.user.username}
        </span>
      </Link>
  );
}

export default UserListItem;