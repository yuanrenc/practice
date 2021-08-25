import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

function Welcome(props) {
  console.log(props);
  return <h1>Hello Welcome {props.name}</h1>;
}

//component 首字母大写 self close
ReactDOM.render(
  <Welcome name="foo" gender="male" city="sydney" />,
  document.getElementById("root")
);

const name = "jackie";
const age = 12;
const str2 = `${age} ${name}`;
console.log(str2);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
