import React from 'react';

const ButtonWithProgress = (props) => {

  return (
      <button
          disabled={props.disabled}
          className={props.buttonClassName}
          onClick={props.onClick}>
        {props.showProgress &&
        <div className="spinner-border text-light spinner-border-sm mr-2" role="status">
        </div>
        }
        <span>{props.displayText}</span>
      </button>
  );
}

ButtonWithProgress.defaultProps = {
  onClick: () => {},
  showProgress: false,
  disabled:false,
  buttonClassName: 'btn btn-primary',
  displayText: 'Submit'
}

export default ButtonWithProgress;