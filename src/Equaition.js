import { ACTIONS } from './App';
// here we are using destructuring method
// much cleaner code
function Equation({ dispatch, equation }) {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.operation, payload: { equation } })
      }
    >
      {equation}
    </button>
  );
}

export default Equation;
