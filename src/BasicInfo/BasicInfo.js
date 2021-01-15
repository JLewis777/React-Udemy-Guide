import React from "react";
import "./BasicInfo.css";

const basicInfo = (props) => {
  // For the Challenge
  return (
    <div className="BasicInfo">
      <p onClick={props.click}>Name: {props.name}</p>
      <p>Number: {props.number}</p>
      <p>DOB: {props.DOB}</p>
    </div>
  );
};

export default basicInfo;
