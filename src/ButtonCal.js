import { ACTIONS } from './App';
// here i'm using the old way basic 'props'
// not as good as it's looks like
function ButtonCal(props) {
  return (
    <button
      onClick={() =>
        props.dispatch({
          type: ACTIONS.ADD_DIGIT,
          payload: { digit: props.digit },
        })
      }
    >
      {props.digit}
    </button>
  );
}

export default ButtonCal;
