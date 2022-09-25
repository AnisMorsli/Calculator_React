import './App.css';
import { useReducer } from 'react';
import ButtonCal from './ButtonCal';
import Equation from './Equaition';

export const ACTIONS = {
  ADD_DIGIT: 'add_digit',
  CLEAR: 'clear',
  DELETE: 'delete',
  operation: 'operation',
  evaluate: 'evaluate',
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === '0' && state.currentOprand === '0') {
        return state;
      }

      if (
        payload.digit === '.' &&
        state.currentOprand != null &&
        state.currentOprand.includes('.')
      ) {
        return state;
      }
      if (payload.digit === '.' && state.currentOprand === null) {
        return {
          currentOprand: `${state.currentOprand || '0'}${payload.digit}`,
        };
      }
      return {
        ...state,
        currentOprand: `${state.currentOprand || ''}${payload.digit}`,
      };
    case ACTIONS.operation:
      if (state.previosOprand === null && state.currentOprand === null) {
        return state;
      }
      return state;

    case ACTIONS.CLEAR:
      return {};
  }
}

function App() {
  const [{ currentOprand, previosOprand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );
  return (
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
      <Equation equation="DEL" dispatch={dispatch} />
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
      <button className="span_two"> = </button>
    </div>
  );
}

export default App;
