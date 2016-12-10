import * as Actions from './actions';
import {AppState, CounterState} from './states'

let doState = (init :Object, merge :Object) => Object.assign({}, init, merge);

function counter (state: CounterState, action: { type: string }) {
  switch (action.type) {
    case Actions.INCREMENT:
      return doState(state, { counter: state.counter + 1 });
    case Actions.DECREMENT:
      return doState(state, { counter: state.counter - 1 });
    default:
      return state
  }
}

export default (state :AppState, action: { type: string }) => {
  if (!state) {
    state = { counterState: { counter: 0 }}
  }

  let counterState = counter(state.counterState, action);

  return doState(state, {counterState})
}