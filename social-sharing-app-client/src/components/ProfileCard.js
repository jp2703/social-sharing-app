import React from 'react';
import ProfileImage from "./ProfileImage";
import Input from "./Input";

const ProfileCard = (props) => {
  const {id, displayName, username, image} = props.user;
  const showEditButton = !props.inEditMode && props.editable;
  return (
      <div className="card mt-3 mb-3 p-3"
           style={{width: props.width, height: props.height}}>
        <ProfileImage className={"rounded-circle p-3"} image={image}/>
        <div className="card-body text-center">
          {!props.inEditMode &&
          <h4 className="card-text">
            {displayName}@{username}
          </h4>
          }
          {props.inEditMode &&
          <div>
            <Input
                className={"form-control"}
                label={"Change Display Name"}
                value={props.updatedDisplayName === undefined ? displayName
                    : props.updatedDisplayName}
                onChange={props.onUpdateDisplayName}
            />
          </div>
          }
          {showEditButton &&
          <button className={"btn btn-outline-success"}
                  onClick={props.onClickEdit}>
            <i className={"fas fa-user-edit"}/> Edit
          </button>
          }
          {props.inEditMode &&
          (
              <div className={"container"}>
                <button className={"btn btn-outline-primary"}
                        disabled={props.isUpdatingUser || props.updatedDisplayName===undefined}
                        onClick={() => props.onClickSave(id,
                            {displayName: props.updatedDisplayName})}>
                  <i className={"fas fa-save"} style={{marginRight: "3px"}}/>
                  {props.isUpdatingUser &&
                  <div className="spinner-border text-light spinner-border-sm mr-2" role="status"/>
                  }
                  {!props.isUpdatingUser &&
                   <span>Save</span>
                  }
                </button>
                <button style={{marginLeft: "5px"}} className={"btn btn-outline-secondary"} disabled={props.isUpdatingUser}
                        onClick={props.onClickCancel}>
                  <i className={"fas fa-window-close"}/> Cancel
                </button>
              </div>
          )
          }
        </div>
      </div>
  );
}

ProfileCard.defaultProps = {}

export default ProfileCard;