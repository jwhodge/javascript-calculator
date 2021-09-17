import React from 'react';
import './App.css';
import './button-layout.css';

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Display />
        <Input />
      </div>
    </div>
  );
}

function Display(){
  return (
    <div className="Display" id="display">
      <h1>Display Panel</h1>
    </div>
  )
}

function Input(){
  return (
    <div className="Input">
      {/* numerals */}
      <button className="btn" id="seven">7</button>
      <button className="btn" id="eight">8</button>
      <button className="btn" id="nine">9</button>
      <button className="btn" id="four">4</button>
      <button className="btn" id="five">5</button>
      <button className="btn" id="six">6</button>
      <button className="btn" id="one">1</button>
      <button className="btn" id="two">2</button>
      <button className="btn" id="three">3</button>
      <button className="btn, btn-dw" id="zero">0</button>
      {/* Operators */}
      <button className="btn, btn-dw" id="clear">AC</button>
      <button className="btn" id="decimal">.</button>
      <button className="btn" id="divide">/</button>
      <button className="btn" id="multiply">x</button>
      <button className="btn" id="add">+</button>
      <button className="btn" id="subtract">-</button>
      <button className="btn, btn-dh" id="equals">=</button>
    </div>
  )
}

export default App;
