import React, { Component } from "react";
// import styled from "styled-components";  // Styled-components
import "./App.css";
import Person from "./Person/Person";
import BasicInfo from "./BasicInfo/BasicInfo";

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
    super();
    this.state = {
      persons: [
        { id: "aheyu1", name: "Josh", age: 24 },
        { id: "bdtey7", name: "Ericzander", age: 25 },
        { id: "lsnvd2", name: "Lewis", age: 26 },
      ],
      showPersons: false,
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

    if (this.state.showPersons) {
      // UNLESS, this is true. Then run that code for persons
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => this.nameChangedHandler(event, person.id)}
              />
            );
          })}
        </div>
      );
      // style.backgroundColor = "red"; // This changes the button color conditionally
      // style[":hover"] = {
      //   backgroundColor: "salmon",
      //   color: "black;",
      // };
    }

    // let classes = ["red", "bold"].join(" "); // "red bold", strange but this works..
    const classes = []; // Using const because it will always be an array
    if (this.state.persons.length <= 2) {
      classes.push("red"); // classes = ['red']
    }
    if (this.state.persons.length <= 1) {
      classes.push("bold"); // classes = ['red', 'bold']
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(" ")}>This is working also!</p>
        <button
          alt={this.state.showPersons}
          onClick={this.togglePersonsHandler}
        >
          Toggle Persons
        </button>
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
      </div>
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
