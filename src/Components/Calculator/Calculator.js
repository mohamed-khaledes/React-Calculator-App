import React,{ useState ,useReducer} from 'react'
import './Calculator.css'
import DigitButton from '../DigitButton/DigitButton'
import OperationButton from '../OperationButton/OperationButton'
// actions for reducer function
export const ACTIONS ={
    ADD_DIGIT:'add-digit',
    CHOOSE_OPERATION:"choose-operation",
    CLEAR:"clear",
    DELET_DIGIT:"delete-digit",
    ELALUATE:"evaluate"
}

// function called reducer for the useReducer
function reducer(state,{type,payload}){
    switch (type){
        case ACTIONS.ADD_DIGIT:
            if(state.overwrite){
                return{
                    ...state,
                    currentOperand:payload.digit,
                    overwrite:false
                }
            }
            if(payload.digit === "0" && state.currentOperand === "0"){return state}
            if(payload.digit === "." && state.currentOperand.includes(".")){return state}
            return {
            // i wrote {state.currentOperand || ""}
            //because if i click on the button during
            //the currentOperand is empty will return undefined
            //so I wrote || "" because if the currentOperand 
            //is empty return to me empty string{""}
            ...state,
            currentOperand:`${state.currentOperand || ""}${payload.digit}`,
        } 
        case ACTIONS.CHOOSE_OPERATION:
            if(state.currentOperand === undefined && state.previosOperand ===undefined){
                return state
            }
            if(state.currentOperand == null || state.currentOperand === undefined){
                return{
                    ...state,
                    operation:payload.operation,
                }
            }
            if(state.previosOperand === undefined || state.previosOperand ==null){
                return{
                    ...state,
                    operation:payload.operation,
                    previosOperand:state.currentOperand,
                    currentOperand:null
                }
            }
            return{
                ...state,
                previosOperand:evaluate(state),
                operation:payload.operation,
                currentOperand:null
            }
        case ACTIONS.CLEAR:
                return{}
        case ACTIONS.ELALUATE:
            if(state.operation === undefined ||
                state.currentOperand === undefined || 
                state.previosOperand === undefined)
                {
                return state
            }
            return{
                ...state,
                overwrite:true,
                operation:null,
                previosOperand:null,
                currentOperand:evaluate(state)
            }
            
        case ACTIONS.DELET_DIGIT:
            if(state.overwrite){
                return {
                    ...state,
                    overwrite:false,
                    currentOperand:null
                }
            }
            if(state.currentOperand === undefined || state.currentOperand == null){return state}
            if(state.currentOperand.length === 1){
                return {
                    ...state,
                    currentOperand :null
                }
            }
            return{
                ...state,
                currentOperand:state.currentOperand.slice(0,-1)
            }
        default:
            return "" 
    }
}
function evaluate({currentOperand,previosOperand,operation}){
    const prev = parseFloat(previosOperand);
    const current = parseFloat(currentOperand)
    if(isNaN(prev) || isNaN(current)){return ""}
    let computation = "";
    switch(operation){
        case "+":
            computation = prev + current
            break
        case "-":
            computation = prev - current
            break
        case "*":
            computation = prev * current
            break
        case "÷":
            computation = prev / current
            break
            default:
                return ""
    }
    return computation.toString()
}
function Calculator() {
    // state for the calc output {result}
    // const [result , setResult] = useState("")
    // state for switch active class
    const [active,setActive] = useState(1);
    
    
    // toggle active class when the user click 
    const toggleActive =(index)=>{
        setActive(index)
    }
    // class condition for specifice the class when i click
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

    // useReducer
    const [{currentOperand,previosOperand,operation},dispatch] = useReducer(reducer,{})
    
    // dispatch({type:ACTIONS.ADD_DIGIT , payload:{digit:1}})

    return (
    // start contianer
    <div className={classCondition("container")}><div className='calculator'>
    {/* End container */}
    {/* Start calc-head */}
    <div className={classCondition("calc-head")}
    ><div className='logo'>calc</div>
        <div className='theme'>
          <p>THEME</p>
          <div className='switch-theme'>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
            </ul>
            <div className='position'>
              <span onClick={()=>toggleActive(1)}  className={active === 1?"first-color active":"first-color"}></span>
              <span onClick={()=>toggleActive(2)}  className={active === 2?"second-color active":"second-color"}></span>
              <span onClick={()=>toggleActive(3)}  className={active === 3?"third-color active":"third-color"}></span>
            </div>
          </div>
        </div>
    </div>
    {/* end calc-head */}
    {/* start calc output */}
    <div className={classCondition("calc-output")}>
        <p className='previosOperand'>{previosOperand}{operation}</p>
        <p className='currentOperand'>{currentOperand}</p>
    </div>
    {/* end calc output */}
    {/* start calc buttons */}
    <div className={classCondition("calc-buttons")}>
        <DigitButton  active={active} digit="7" dispatch={dispatch}></DigitButton>
        <DigitButton  active={active} digit="8" dispatch={dispatch}></DigitButton>
        <DigitButton  active={active} digit="9" dispatch={dispatch}></DigitButton>
        <button className={classCondition("calc-button")} id='del' onClick={()=> dispatch({type:ACTIONS.DELET_DIGIT})}>DEL</button>
        <DigitButton  active={active} digit="4" dispatch={dispatch}></DigitButton>
        <DigitButton  active={active} digit="5" dispatch={dispatch}></DigitButton>
        <DigitButton  active={active} digit="6" dispatch={dispatch}></DigitButton>
        <OperationButton  active={active} operation="+" dispatch={dispatch}></OperationButton>
        <DigitButton  active={active} digit="1" dispatch={dispatch}></DigitButton>
        <DigitButton  active={active} digit="2" dispatch={dispatch}></DigitButton>
        <DigitButton  active={active} digit="3" dispatch={dispatch}></DigitButton>
        <OperationButton  active={active} operation="-" dispatch={dispatch}></OperationButton>
        <DigitButton  active={active} digit="." dispatch={dispatch}></DigitButton>
        <DigitButton  active={active} digit="0" dispatch={dispatch}></DigitButton>
        <OperationButton  active={active} operation="÷" dispatch={dispatch}></OperationButton>
        <OperationButton  active={active} operation="*" dispatch={dispatch}></OperationButton>
        {/*The dispatch function returned by useReducer lets you update the state to a different value and trigger a re-render. You need to pass the action as the only argument to the dispatch function: */}
        <button className={classCondition("calc-button")} id='reset' onClick={()=>dispatch({type:ACTIONS.CLEAR})}>RESET</button>
        <button className={classCondition("calc-button")} id='equal' onClick={() => dispatch({type:ACTIONS.ELALUATE})}>=</button>
    </div>
    {/* end calc buttons */}
    </div>
    </div>
    )
}

export default Calculator