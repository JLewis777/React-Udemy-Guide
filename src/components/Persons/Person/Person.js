import React, { Component } from "react";
import classes from "./Person.css";
// import Aux from "../../../hoc/Aux";
import WithClass from "../../../hoc/WithClass";
import PropTypes from "prop-types";
// import styled from "styled-components";

// const StyledDiv = styled.div`
//   width: 60%;
//   margin: 16px auto;
//   border: 1px solid #eee;
//   box-shadow: 0 2px 3px #ccc;
//   padding: 16px;
//   text-align: center;

//   /* This is one way how you would use media quieries  */

//   @media (min-width: 500px) {
//     width: 450px;
//   } ;
// `;

class Person extends Component {
  componentDidMount() {
    this.inputElement.focus();
  }

  render() {
    console.log("[Person.js] rendering...");
    return (
      // <div className="Person" style={style}>
      // <div className={classes.Person}>
      <WithClass classes={classes.Person}>
        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p>{this.props.children}</p>
        <input
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
          ref={(inputEl) => {
            this.inputElement = inputEl;
          }}
        />
      </WithClass>
      /* // </div> */
    );
  }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
};

export default Person;
