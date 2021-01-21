import React, { Component } from "react";
import classes from "./BasicInfo.css";

class BasicInfo extends Component {
  render() {
    return (
      <div className={classes.BasicInfo}>
        <p onClick={this.props.click}>Name: {this.props.name}</p>
        <p>Number: {this.props.number}</p>
        <p>DOB: {this.props.DOB}</p>
      </div>
    );
  }
}

export default BasicInfo;
