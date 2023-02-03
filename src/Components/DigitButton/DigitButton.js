import React from "react";
import { ACTIONS } from "../Calculator/Calculator";

export default function DigitButton({dispatch,digit,active}){
  // class condition for specific the class when i click
  const classCondition = (standerdClass) =>{
    if(active ===1){
        return `${standerdClass} first-color`
    }else if(active===2){
    return `${standerdClass} second-color`;
    }else if(active ===3){
        return `${standerdClass} third-color`
    }else{
        return `${standerdClass}`
    }
    // active===1?`${standerdClass} first-color`
    // :active===2?`${standerdClass} second-color`
    // :active===3?`${standerdClass} third-color`:`${standerdClass}`
}
  return (
    <button className={classCondition("calc-button")}
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}
