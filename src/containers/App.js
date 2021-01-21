import React, { Component } from "react";
import Cockpit from "../components/Cockpit/Cockpit";
// import styled from "styled-components";  // Styled-components
import classes from "./App.css";
import Persons from "../components/Persons/Persons";
import BasicInfo from "../components/BasicInfo/BasicInfo";
import WithClass from "../hoc/WithClass";
// import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";

// Styled components method

// const StyledButton = styled.button`
//   background-color: ${(props) => (props.alt ? "red" : "green")};
//   color: white;
//   font: inherit;
//   border: 1px solid blue;
//   padding: 8px;
//   cursor: pointer;

//   &:hover {
//     background-color: ${(props) => (props.alt ? "salmon" : "lightgreen")};
//     color: black;
//   }
// `;

class App extends Component {
  constructor(props) {
    super(props);
    console.log("[App.js] constructor");
  }

  state = {
    persons: [
      { id: "aheyu1", name: "Josh", age: 24 },
      { id: "bdtey7", name: "Ericzander", age: 25 },
      { id: "lsnvd2", name: "Lewis", age: 26 },
    ],
    showPersons: false,
    showCockpit: true,
    // This is the person object for the challenge
    personAdd: [
      {
        id: "f1",
        name: "Joshua Lewis",
        number: "3363273654",
        DOB: "09/26/1996",
      },
      {
        id: "b2",
        name: "Billy Corgan",
        number: "123555123",
        DOB: "03/17/1967",
      },
      {
        id: "c3",
        name: "John Rzeznik",
        number: "123555123",
        DOB: "12/05/1965",
      },
    ],
  };

  static getDerivedStateFromProps(props, state) {
    console.log("[App.js] getDerivedStateFromProps", props);
    return state;
  }

  // componentWillMount() {
  //   console.log("[App.js] componentDidMount");
  // }

  componentDidMount() {
    console.log("[App.js] componentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[App.js] shouldComponentUpdate");
    return true;
  }

  componentDidUpdate() {
    console.log("[App.js] componentDidUpdate");
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex],
    };

    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  };

  deletePersonHandler = (personIndex) => {
    // Lines 27 and 28 achieve the same thing, which is making a copy of the existing persons array.
    // const persons = this.state.persons.slice();  // Slice method
    const persons = [...this.state.persons]; // Spread operator method
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  // This method is for the iteration of the challenge component
  deleteAddedHandler = (personsIndex) => {
    const personsAdd = this.state.personAdd; // The alternate copy method isn't working.
    // const personsAdd = [...this.state.personAdd]; // This creates a "copy" of the original state.
    personsAdd.splice(personsIndex, 1); // Then I change it accordingly but also immutably on lines 52, 53.
    this.setState({ personsAdd: personsAdd });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  render() {
    console.log("[App.js], render");
    // const style = {
    //   backgroundColor: "green",
    //   color: "white",
    //   font: "inherit",
    //   border: "1px solid blue",
    //   padding: "8px",
    //   cursor: "pointer",
    //   // Thanks to Radium, I can now use psudeo selectors
    //   ":hover": {
    //     backgroundColor: "lightgreen",
    //     color: "black;",
    //   },
    // };

    let persons = null; // Show nothing when you render the page.
    // let btnClass = [classes.Button];

    if (this.state.showPersons) {
      // UNLESS, this is true. Then run that code for persons
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
        />
      );
    }

    // let classes = ["red", "bold"].join(" "); // "red bold", strange but this works..

    return (
      <WithClass classes={classes.App}>
        <button
          onClick={() => {
            this.setState({ showCockpit: false });
          }}
        >
          Remove Cockpit
        </button>
        {this.state.showCockpit ? (
          <Cockpit
            showPersons={this.state.showPersons}
            persons={this.state.persons}
            clicked={this.togglePersonsHandler}
            title={this.props.appTitle}
            personsLength={this.state.persons.length}
          />
        ) : null}
        {persons}
        <div>
          {this.state.personAdd.map((newPerson, index) => {
            return (
              <BasicInfo
                click={() => this.deleteAddedHandler(index)}
                name={newPerson.name}
                number={newPerson.number}
                DOB={newPerson.DOB}
                key={newPerson.id}
              />
            );
          })}
          {/* <BasicInfo
            name={this.state.personAdd.name}
            number={this.state.personAdd.number}
            DOB={this.state.personAdd.DOB}
          /> */}
        </div>
      </WithClass>
    );

    // Below is the equivilent to using the JSX above. It's just the breakdown of how it is compiled.
    /*
    return React.createElement(
      "div",
      { className: "App" },
      React.createElement("h1", { className: "App" }, "Does this work now?")
    );
    */
  }
}

export default App;
