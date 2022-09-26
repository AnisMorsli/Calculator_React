import './App.css';
import { useReducer } from 'react';
import ButtonCal from './ButtonCal';
import Equation from './Equation';
import { useEffect } from 'react';

export const ACTIONS = {
  ADD_DIGIT: 'add_digit',
  CLEAR: 'clear',
  DELETE: 'delete',
  operation: 'operation',
  evaluate: 'evaluate',
};

function reducer(state, { type, payload }) {
  switch (type) {
    // add digit logic
    case ACTIONS.ADD_DIGIT:
      //after evalution so if we add a digit it will clear the old equation and print the new digit
      if (state.reset === true) {
        return {
          ...state,
          currentOprand: payload.digit,
          reset: false,
        };
      }
      //can't add more than one '0' at first
      if (payload.digit === '0' && state.currentOprand === '0') {
        return state;
      }
      //so we can add a float numbers
      if (
        (payload.digit !== '0' || payload.digit !== '.') &&
        state.currentOprand === '0'
      ) {
        return {
          currentOprand: `${state.currentOprand}${payload.digit}`,
        };
      }
      // can't add more than one '.'
      if (payload.digit === '.' && state.currentOprand.includes('.')) {
        return state;
      }
      // adding the digit
      return {
        ...state,
        currentOprand: `${state.currentOprand || ''}${payload.digit}`,
      };

    // operation logic
    // the logic is clear
    case ACTIONS.operation:
      if (state.currentOprand == null) {
        return {
          ...state,
          operation: payload.equation,
        };
      }
      if (state.previosOprand === null && state.currentOprand === null) {
        return state;
      }
      if (state.previosOprand == null) {
        return {
          ...state,
          operation: payload.equation,
          previosOprand: state.currentOprand,
          currentOprand: null,
        };
      }
      // evalute is a function that does what it means :p
      return {
        ...state,
        previosOprand: evalute(state),
        currentOprand: null,
        operation: payload.equation,
      };
    // clear the calculator
    case ACTIONS.CLEAR:
      return {
        currentOprand: '0',
        previosOprand: null,
        equation: null,
      };

    case ACTIONS.evaluate:
      if (
        state.currentOprand == null ||
        state.operation == null ||
        state.previosOprand == null
      ) {
        return state;
      }
      return {
        ...state,
        currentOprand: evalute(state),
        previosOprand: null,
        operation: null,
        reset: true,
      };
    case ACTIONS.DELETE:
      if (state.currentOprand === null) {
        return state;
      }
      if (state.currentOprand.length === 0) {
        return {
          currentOprand: null,
        };
      }

      return {
        ...state,
        currentOprand: state.currentOprand.slice(0, -1),
      };
  }
}
// this function will do the calculation
//it takes the state, i used the destructuring method for a much cleaner code
function evalute({ currentOprand, previosOprand, operation }) {
  let current = parseFloat(currentOprand); // convert the string into float
  let previos = parseFloat(previosOprand); // convert the string into float
  let computation = null;
  //it depends on the operation it will execute the following logic

  switch (operation) {
    case '/':
      computation = current / previos;
      break;

    case '*':
      computation = current * previos;
      break;
    case '-':
      computation = current - previos;
      break;
    case '+':
      computation = current + previos;
      break;
  }
  return computation.toString();
}

function App() {
  const [{ currentOprand, previosOprand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );
  function firstrender() {
    dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: '0' } });
  }
  useEffect(() => {
    firstrender();
  }, []);
  return (
    <>
      <div className="cal-grid">
        <div className="output">
          <div className="uNumber">
            {previosOprand} {operation}
          </div>
          <div className="bNumber">{currentOprand}</div>
        </div>
        <button
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
          className="span_two"
        >
          AC
        </button>
        <button onClick={() => dispatch({ type: ACTIONS.DELETE })}>DEL</button>
        <Equation equation="/" dispatch={dispatch} />
        <ButtonCal digit="1" dispatch={dispatch} />
        <ButtonCal digit="2" dispatch={dispatch} />
        <ButtonCal digit="3" dispatch={dispatch} />
        <Equation equation="*" dispatch={dispatch} />
        <ButtonCal digit="4" dispatch={dispatch} />
        <ButtonCal digit="5" dispatch={dispatch} />
        <ButtonCal digit="6" dispatch={dispatch} />
        <Equation equation="+" dispatch={dispatch} />
        <ButtonCal digit="7" dispatch={dispatch} />
        <ButtonCal digit="8" dispatch={dispatch} />
        <ButtonCal digit="9" dispatch={dispatch} />
        <Equation equation="-" dispatch={dispatch} />
        <ButtonCal digit="." dispatch={dispatch} />
        <ButtonCal digit="0" dispatch={dispatch} />
        <button
          className="span_two"
          onClick={() => dispatch({ type: ACTIONS.evaluate })}
        >
          {' '}
          ={' '}
        </button>
      </div>
      <div className="dev">
        <h1>developed by Anis</h1>
      </div>
    </>
  );
}

export default App;
