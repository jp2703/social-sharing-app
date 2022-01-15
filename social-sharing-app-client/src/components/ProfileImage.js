import React from 'react';
import defaultProfilePic from "../assets/profile.png"

const ProfileImage = (props) => {
  let imageSource = defaultProfilePic;
  if (props.image) {
    imageSource = `/images/profile/${props.image}`
  }
  console.log(imageSource)
  return (
      <img
          onError={event => {
            event.target.src = defaultProfilePic;
          }}
          src={props.source || imageSource}
          {...props}
      />
  );
}

ProfileImage.defaultProps = {}

export default ProfileImage;