import React from 'react';
import ProfileImage from "./ProfileImage";

const ProfileCard = (props) => {
  const {displayName, username, image} = props.user;
  return (
      <div className="card mt-3 mb-3 p-3"
           style={{width: props.width, height: props.height}}>
        <ProfileImage className={"rounded-circle p-3"} image={image}/>
        <div className="card-body text-center">
          <p className="card-text">{displayName}@{username}</p>
        </div>
      </div>
  );
}

ProfileCard.defaultProps = {}

export default ProfileCard;