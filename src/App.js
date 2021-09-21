import React from "react";
import "./App.css";
import "./button-layout.css";

const buttonMap = [
  { class: "btn", id: "seven", val: "7", display: "7", icon: "", jskeycode: 0 },
  { class: "btn", id: "eight", val: "8", display: "8", icon: "", jskeycode: 0 },
  { class: "btn", id: "nine", val: "9", display: "9", icon: "", jskeycode: 0 },
  { class: "btn", id: "four", val: "4", display: "4", icon: "", jskeycode: 0 },
  { class: "btn", id: "five", val: "5", display: "5", icon: "", jskeycode: 0 },
  { class: "btn", id: "six", val: "6", display: "6", icon: "", jskeycode: 0 },
  { class: "btn", id: "one", val: "1", display: "1", icon: "", jskeycode: 0 },
  { class: "btn", id: "two", val: "2", display: "2", icon: "", jskeycode: 0 },
  { class: "btn", id: "three", val: "3", display: "3", icon: "", jskeycode: 0 },
  {
    class: "btn btn-dw",
    id: "zero",
    val: "0",
    display: "0",
    icon: "",
    jskeycode: 0,
  },
  {
    class: "btn btn-dw",
    id: "clear",
    val: "AC",
    display: "AC",
    icon: "",
    jskeycode: 0,
  },
  {
    class: "btn",
    id: "decimal",
    val: ".",
    display: ".",
    icon: "",
    jskeycode: 0,
  },
  {
    class: "btn",
    id: "divide",
    val: "/",
    display: "/",
    icon: "",
    jskeycode: 0,
  },
  {
    class: "btn",
    id: "multiply",
    val: "*",
    display: "x",
    icon: "",
    jskeycode: 0,
  },
  { class: "btn", id: "add", val: "+", display: "+", icon: "", jskeycode: 0 },
  {
    class: "btn",
    id: "subtract",
    val: "-",
    display: "-",
    icon: "",
    jskeycode: 0,
  },
  {
    class: "btn btn-dh",
    id: "equals",
    val: "=",
    display: "=",
    icon: "",
    jskeycode: 0,
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 100,
    };
  }

  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <Display onScreen={this.state.total} />
          <Input />
        </div>
      </div>
    );
  }
}

function Display(props) {
  return (
    <div className="Display" id="display">
      {props.onScreen}
    </div>
  );
}

function Input() {
  return (
    <div className="Input">
      <Button btnInfo={buttonMap[0]} />
      <Button btnInfo={buttonMap[1]} />
      <Button btnInfo={buttonMap[2]} />
      <Button btnInfo={buttonMap[3]} />
      <Button btnInfo={buttonMap[4]} />
      <Button btnInfo={buttonMap[5]} />
      <Button btnInfo={buttonMap[6]} />
      <Button btnInfo={buttonMap[7]} />
      <Button btnInfo={buttonMap[8]} />
      <Button btnInfo={buttonMap[9]} />
      <Button btnInfo={buttonMap[10]} />
      <Button btnInfo={buttonMap[11]} />
      <Button btnInfo={buttonMap[12]} />
      <Button btnInfo={buttonMap[13]} />
      <Button btnInfo={buttonMap[14]} />
      <Button btnInfo={buttonMap[15]} />
      <Button btnInfo={buttonMap[16]} />
    </div>
  );
}

function Button(props) {
  const btnArr = props.btnInfo;
  return (
    <button className={btnArr.class} id={btnArr.id} value={btnArr.val}>
      {btnArr.display}
    </button>
  );
}

export default App;
