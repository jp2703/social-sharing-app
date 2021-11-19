import React from 'react';

const Input = (props) => {
  let inputClassName = "form-control"
  if (props.hasError == !undefined) {
    inputClassName += props.hasError ? " is-invalid" : "is-valid";
  }

  return (
      <div className={"col-12 mb-3"}>
        {props.label && <label>{props.label}</label>}
        <input type={props.type || 'text'}
               placeholder={props.placeholder}
               value={props.value}
               onChange={props.onChange}
               className={inputClassName}
        />
        {props.hasError &&
          <span className={"invalid-feedback"}>{props.error}</span>
        }
      </div>
  );
}

Input.defaultProps = {
  onChange: () => {
  }
}

export default Input;