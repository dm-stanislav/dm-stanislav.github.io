"use strict";

// Declaring constants
const submit = document.querySelector("#btn-equ");
const clean = document.querySelector("#btn-cln");
const result = document.querySelector(".calc__result");

// Caclulator
const calcBody = document.querySelector(".calc__body");
let newResult;
let isCalculated = false;
const calcOperators = ["+", "-", "÷", "×"];

// Event delegation
calcBody.addEventListener("click", (e) => {
  // Clean the input field
  if (e.target === clean) {
    result.value = "";
    isCalculated = false;
  }

  // If a number or an operator is pressed
  if (
    e.target.classList.contains("calc__btn") &&
    e.target !== submit &&
    e.target !== clean
  ) {
    // If an operator is pressed first
    if (
      e.target.classList.contains("calc__op") &&
      e.target !== submit &&
      result.value === ""
    ) {
      result.value = "0";
    }

    // If the result is Infinity
    if (isCalculated) {
      result.value = "";
      // If an operator is pressed after Infinity result
      if (e.target.classList.contains("calc__op") && e.target !== submit) {
        result.value = "0";
      }
      isCalculated = false;
    }

    // If an operator is pressed twice
    if (
      calcOperators.includes(result.value[result.value.length - 1]) &&
      e.target.classList.contains("calc__op") &&
      e.target !== submit
    ) {
      result.value = result.value.substring(0, result.value.length - 1);
    }

    // Entering numbers and operators
    result.value += e.target.textContent;
  }

  // If = is pressed
  if (e.target === submit) {
    // Converting the operators
    newResult = result.value.replace(/÷/g, "/").replace(/×/g, "*");

    // Calculating
    try {
      eval(newResult);
    } catch (e) {
      if (e instanceof SyntaxError) {
        result.value = "NaN";
        isCalculated = true;
        return;
      }
    }
    if (!Number.isInteger(eval(newResult))) {
      let floatResult = eval(newResult).toFixed(6);
      result.value = parseFloat(floatResult);
    } else result.value = eval(newResult);

    if (!isFinite(result.value)) {
      isCalculated = true;
    }
  }
});
