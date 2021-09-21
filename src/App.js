import React from "react";
import "./App.css";
import "./button-layout.css";

const buttonMap = [
  {
    class: "btn",
    id: "seven",
    val: "7",
    display: "7",
    icon: "",
    jskeycode: NaN,
  },
  {
    class: "btn",
    id: "eight",
    val: "8",
    display: "8",
    icon: "",
    jskeycode: NaN,
  },
  {
    class: "btn",
    id: "nine",
    val: "9",
    display: "9",
    icon: "",
    jskeycode: NaN,
  },
  {
    class: "btn",
    id: "four",
    val: "4",
    display: "4",
    icon: "",
    jskeycode: NaN,
  },
  {
    class: "btn",
    id: "five",
    val: "5",
    display: "5",
    icon: "",
    jskeycode: NaN,
  },
  {
    class: "btn",
    id: "six",
    val: "6",
    display: "6",
    icon: "",
    jskeycode: NaN,
  },
  {
    class: "btn",
    id: "one",
    val: "1",
    display: "1",
    icon: "",
    jskeycode: NaN,
  },
  {
    class: "btn",
    id: "two",
    val: "2",
    display: "2",
    icon: "",
    jskeycode: NaN,
  },
  {
    class: "btn",
    id: "three",
    val: "3",
    display: "3",
    icon: "",
    jskeycode: NaN,
  },
  {
    class: "btn btn-dw",
    id: "zero",
    val: "0",
    display: "0",
    icon: "",
    jskeycode: NaN,
  },
  {
    class: "btn btn-dw",
    id: "clear",
    val: "AC",
    display: "AC",
    icon: "",
    jskeycode: 46,
  },
  {
    class: "btn",
    id: "decimal",
    val: ".",
    display: ".",
    icon: "",
    jskeycode: NaN,
  },
  {
    class: "btn",
    id: "divide",
    val: "/",
    display: "/",
    icon: "",
    jskeycode: NaN,
  },
  {
    class: "btn",
    id: "multiply",
    val: "*",
    display: "x",
    icon: "",
    jskeycode: NaN,
  },
  {
    class: "btn",
    id: "add",
    val: "+",
    display: "+",
    icon: "",
    jskeycode: NaN,
  },
  {
    class: "btn",
    id: "subtract",
    val: "-",
    display: "-",
    icon: "",
    jskeycode: NaN,
  },
  {
    class: "btn btn-dh",
    id: "equals",
    val: "=",
    display: "=",
    icon: "",
    jskeycode: 13,
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      formula: "",
    };

    this.setAppState = this.setAppState.bind(this);
  }

  setAppState(newState) {
    console.log(newState);
    this.setState({
      total: newState,
      formula: this.state.formula.concat(newState),
    });
  }

  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <Display total={this.state.total} formula={this.state.formula} />
          <Input setAppState={this.setAppState} />
        </div>
      </div>
    );
  }
}

function Display(props) {
  return (
    <div className="Display" id="display">
      <div className="displayFormula">{props.formula}</div>
      <div className="displayTotal">{props.total}</div>
    </div>
  );
}

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Input">
        <Button keys={this.props.setAppState} btnInfo={buttonMap[0]} />
        <Button keys={this.props.setAppState} btnInfo={buttonMap[1]} />
        <Button keys={this.props.setAppState} btnInfo={buttonMap[2]} />
        <Button keys={this.props.setAppState} btnInfo={buttonMap[3]} />
        <Button keys={this.props.setAppState} btnInfo={buttonMap[4]} />
        <Button keys={this.props.setAppState} btnInfo={buttonMap[5]} />
        <Button keys={this.props.setAppState} btnInfo={buttonMap[6]} />
        <Button keys={this.props.setAppState} btnInfo={buttonMap[7]} />
        <Button keys={this.props.setAppState} btnInfo={buttonMap[8]} />
        <Button keys={this.props.setAppState} btnInfo={buttonMap[9]} />
        <Button keys={this.props.setAppState} btnInfo={buttonMap[10]} />
        <Button keys={this.props.setAppState} btnInfo={buttonMap[11]} />
        <Button keys={this.props.setAppState} btnInfo={buttonMap[12]} />
        <Button keys={this.props.setAppState} btnInfo={buttonMap[13]} />
        <Button keys={this.props.setAppState} btnInfo={buttonMap[14]} />
        <Button keys={this.props.setAppState} btnInfo={buttonMap[15]} />
        <Button keys={this.props.setAppState} btnInfo={buttonMap[16]} />
      </div>
    );
  }
}

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.inputTrigger = this.inputTrigger.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(e) {
    let arg = this.props.btnInfo;
    if (e.key === arg.val || e.keyCode === arg.jskeycode) {
      this.props.keys(arg.val);
    }
  }

  inputTrigger(e) {
    this.props.keys(e.target.value);
  }

  render() {
    const btnArr = this.props.btnInfo;
    return (
      <button
        className={btnArr.class}
        id={btnArr.id}
        value={btnArr.val}
        onClick={this.inputTrigger}
      >
        {btnArr.display}
      </button>
    );
  }
}

export default App;
