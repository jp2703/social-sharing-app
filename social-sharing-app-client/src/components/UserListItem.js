import React from 'react';
import defaultProfilePic from "../assets/profile.png"
import {Link} from "react-router-dom";

const UserListItem = (props) => {
  let imageSource = defaultProfilePic;
  if(props.user.image){
    imageSource = `/images/profile/${props.user.image}`
  }

  return (
      <Link to={`/users/${props.user.username}`} className={"list-group-item list-group-item-action"}>
        <img className={"rounded-circle"} src={imageSource} alt={"profile"} width={32} height={32}/>
        <span className={"pl-2"}>
          {props.user.displayName} - {props.user.username}
        </span>
      </Link>
  );
}

export default UserListItem;