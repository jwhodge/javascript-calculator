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

const operator = /\+|-|\*|\//;
const digit = /\d|\./;
const equals = /=/;
const lastNum = /(\d|\.)*$/;

/* function checkInputType(input) {
  console.log(input, typeof input);
  if (operator.test(input)) {
    console.log("operator");
  } else if (digit.test(input)) {
    console.log("digit");
  } else if (equals.test(input)) {
    console.log("equals");
  } else if (input === "AC") {
    console.log("Clear all and set to zero");
  } else {
    console.log("input not valid");
  }
} */

function doMaths(op, num1, num2) {
  switch (op) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
    default:
      console.log("Operator Error");
  }
}

function checkDigits(input, string) {
  switch (input) {
    case "0":
      if (
        (string.length === 1 && string.endsWith("0")) ||
        (string.endsWith("0") && string.endsWith("+", string.length - 1))
      ) {
        console.log("Leading Zeroes!!!");
        return false;
      }
      return true;
    case ".":
      if (string.endsWith(".")) {
        console.log("Double decimal!!!");
        return false;
      }
      return true;
    default:
      return true;
  }
}

function digitCapacityGate(string, number) {
  if (string.length >= 18) {
    console.log("Error - Digit Limit Reached");
  } else if (number > "15digits?") {
    console.log("Error - Digit Limit Reached");
  }
}

function extractLastNumber(string, regex) {
  let arr = string.match(regex);
  console.log("push to arr", arr);
  let x = parseFloat(arr[0], 10);
  if (isNaN(x)) {
    return "double op";
  }
  return x;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      formulaStr: "",
      formulaArr: [],
    };

    this.manageInput = this.manageInput.bind(this);
    this.setTotal = this.setTotal.bind(this);
  }

  /* state update methods */
  setTotal(newTotal) {
    this.setState({
      total: newTotal,
    });
  }

  resetCalculation() {
    this.setState({
      total: 0,
      formulaStr: "",
      formulaArr: [],
    });
  }

  updateFormulaStr(addToStr) {
    this.setState({
      formulaStr: this.state.formulaStr.concat(addToStr),
    });
  }

  updateFormulaArr(addToArr) {
    this.setState({
      formulaArr: [...this.state.formulaArr, addToArr],
    });
  }

  /* This is the input routing function */
  manageInput(newInput) {
    console.log(newInput, typeof newInput);
    /* if operator updates array with number and op. Adds op to str */
    if (operator.test(newInput)) {
      console.log("operator");
      this.updateFormulaArr(extractLastNumber(this.state.formulaStr, lastNum));
      this.updateFormulaArr(newInput);
      this.updateFormulaStr(newInput);
    } else if (digit.test(newInput)) {
      /* if digit checks for leading zeros or repated decimal point then updates string */
      console.log("digit");
      let test = checkDigits(newInput, this.state.formulaStr);
      if (test) {
        this.updateFormulaStr(newInput);
      }
    } else if (equals.test(newInput)) {
      /* If equals updates array with number, adds = to str and runs the compute algorithm */
      console.log("equals");
      this.updateFormulaArr(extractLastNumber(this.state.formulaStr, lastNum));
      this.updateFormulaStr(newInput);
      this.getAnswer(this.state.formulaArr);
    } else if (newInput === "AC") {
      /* resets the calculator */
      this.resetCalculation();
    } else {
      /* fallback cosole error */
      console.log("input not valid");
    }
    console.log(this.state.formulaArr);
  }

  getAnswer(array) {
    array.forEach((element, index) => {
      this.computeImperative(array, element, index);
    });
  }

  computeImperative(array, element, index) {
    console.log("test", array, typeof element, index);
    let answer = this.state.total;
    if (typeof element === "number") {
      console.log("do this number stuff");
      if (index === 0) {
        answer = doMaths("+", answer, element);
      } else if (array[index - 2] === "double op" && array[index - 1] === "-") {
        answer = doMaths(array[index - 3], answer, doMaths("*", -1, element));
      } else {
        answer = doMaths(array[index - 1], answer, element);
      }
    }
    console.log(answer);
    this.setTotal(answer);
  }

  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <Display
            total={this.state.total}
            formulaStr={this.state.formulaStr}
          />
          <Input manageInput={this.manageInput} />
        </div>
      </div>
    );
  }
}

function Display(props) {
  return (
    <div className="Display">
      <div className="displayformulaStr">{props.formulaStr}</div>
      <div className="displayTotal" id="display">
        {props.total}
      </div>
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
        <Button keys={this.props.manageInput} btnInfo={buttonMap[0]} />
        <Button keys={this.props.manageInput} btnInfo={buttonMap[1]} />
        <Button keys={this.props.manageInput} btnInfo={buttonMap[2]} />
        <Button keys={this.props.manageInput} btnInfo={buttonMap[3]} />
        <Button keys={this.props.manageInput} btnInfo={buttonMap[4]} />
        <Button keys={this.props.manageInput} btnInfo={buttonMap[5]} />
        <Button keys={this.props.manageInput} btnInfo={buttonMap[6]} />
        <Button keys={this.props.manageInput} btnInfo={buttonMap[7]} />
        <Button keys={this.props.manageInput} btnInfo={buttonMap[8]} />
        <Button keys={this.props.manageInput} btnInfo={buttonMap[9]} />
        <Button keys={this.props.manageInput} btnInfo={buttonMap[10]} />
        <Button keys={this.props.manageInput} btnInfo={buttonMap[11]} />
        <Button keys={this.props.manageInput} btnInfo={buttonMap[12]} />
        <Button keys={this.props.manageInput} btnInfo={buttonMap[13]} />
        <Button keys={this.props.manageInput} btnInfo={buttonMap[14]} />
        <Button keys={this.props.manageInput} btnInfo={buttonMap[15]} />
        <Button keys={this.props.manageInput} btnInfo={buttonMap[16]} />
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
