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
const decimalCheck = /(\d*\.\d*)$/;

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
      if (string.endsWith(".") || decimalCheck.test(string)) {
        console.log("Double decimal!!!");
        return false;
      }
      return true;
    default:
      return true;
  }
}

function digitCapacityGate(string, number) {
  if (string.length >= 24 || number.toString().length > 20) {
    return "Error - Limit Reached";
  }
  return number;
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

function extractDisplay(string, regex) {
  console.log(string);
  let arr = string.match(regex);
  console.log("push to disp arr", arr);
  let x = arr[0];
  if (isNaN(x)) {
    return "double op";
  }
  return x;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      runningDisplay: "0",
      total: 0,
      formulaStr: "",
      formulaArr: [],
      evaluated: false,
    };

    this.manageInput = this.manageInput.bind(this);
    this.setTotal = this.setTotal.bind(this);
    this.resetCalculation = this.resetCalculation.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.updateFormulaArr = this.updateFormulaArr.bind(this);
    this.updateFormulaStr = this.updateFormulaStr.bind(this);
    this.manageInput = this.manageInput.bind(this);
    this.getAnswer = this.getAnswer.bind(this);
    this.computeImmediate = this.computeImmediate.bind(this);
  }

  /* state update methods */
  setTotal(newTotal) {
    this.setState(() => {
      return { total: newTotal };
    });
  }

  resetCalculation() {
    this.setState(() => {
      return {
        runningDisplay: "0",
        total: 0,
        formulaStr: "",
        formulaArr: [],
        evaluated: false,
      };
    });
  }

  updateDisplay(latest) {
    this.setState(() => {
      return {
        runningDisplay: latest,
      };
    });
  }

  updateFormulaStr(addToStr) {
    this.setState((state) => {
      return { formulaStr: state.formulaStr + addToStr };
    });
  }

  updateFormulaArr(addToArr) {
    this.setState((state) => {
      return {
        formulaArr: [...state.formulaArr, addToArr],
      };
    });
  }

  manageEquals = (addToArr) => {
    this.setState({ formulaArr: [...this.state.formulaArr, addToArr] }, () => {
      this.getAnswer(this.state.formulaArr);
    });
    this.setState({
      evaluated: true,
    });
  };

  /* This is the input routing function */
  manageInput(newInput) {
    /* if operator updates array with number and op. Adds op to str */
    if (operator.test(newInput)) {
      if (this.state.evaluated) {
        console.log("operator after equals");
        this.setState(
          {
            formulaArr: [this.state.total],
            formulaStr: this.state.total,
            evaluated: false,
          },
          () => {
            this.setTotal(0);
          }
        );
      } else {
        console.log("operator");
        this.updateFormulaArr(
          extractLastNumber(this.state.formulaStr, lastNum)
        );
      }
      this.updateFormulaArr(newInput);
      this.updateFormulaStr(newInput);
      this.updateDisplay(newInput);
    } else if (digit.test(newInput)) {
      if (this.state.evaluated) {
        console.log("digit after equals");
        this.resetCalculation();
      }
      /* if digit checks for leading zeros or repated decimal point then updates string */
      console.log("digit");
      let test = checkDigits(newInput, this.state.formulaStr);
      if (test) {
        this.updateDisplay(
          extractDisplay(this.state.formulaStr + newInput, lastNum)
        );
        this.updateFormulaStr(newInput);
      }
    } else if (equals.test(newInput)) {
      /* If equals updates array with number, adds = to str and runs the compute algorithm */
      console.log("equals");
      this.manageEquals(extractLastNumber(this.state.formulaStr, lastNum));
      this.updateFormulaStr(newInput);
    } else if (newInput === "AC") {
      /* resets the calculator */
      this.resetCalculation();
    } else {
      /* fallback console error */
      console.log("input not valid");
    }
    /*     this.updateDisplay(
      digitCapacityGate(this.state.formulaStr, this.state.total)
    ); */
  }

  getAnswer(array) {
    let count = this.state.total;
    array.forEach((element, index) => {
      let x = this.computeImmediate(array, element, index, count);
      count = x;
    });
    this.setTotal(count);
    this.updateDisplay(count);
  }

  computeImmediate(array, element, index, count) {
    console.log("test", array, typeof element, index);
    let answer = count;
    if (typeof element === "number") {
      if (index === 0) {
        answer = doMaths("+", answer, element);
      } else if (array[index - 2] === "double op" && array[index - 1] === "-") {
        answer = doMaths(array[index - 3], answer, doMaths("*", -1, element));
      } else {
        answer = doMaths(array[index - 1], answer, element);
      }
    }
    console.log("imperative out", answer);
    return answer;
  }

  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <Display
            runDisplay={this.state.runningDisplay}
            formulaStr={this.state.formulaStr}
            formulaArr={this.state.formulaArr}
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
      <div className="displayFormulaStr">{props.formulaStr}</div>
      <div className="displayTotal" id="display">
        {props.runDisplay}
      </div>
      <div className="displayFormulaArr" id="display">
        {props.formulaArr}
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
    /* document.addEventListener("click", this.inputTrigger); */
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
    /* document.removeEventListener("click", this.inputTrigger); */
  }

  handleKeyPress(e) {
    let arg = this.props.btnInfo;
    if (e.key === arg.val || e.keyCode === arg.jskeycode) {
      this.props.keys(arg.val);
    }
  }

  inputTrigger(e) {
    e.stopPropagation();
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
