import * as Actions from './actions';
import * as States from './states'
import Cache from './cache'

let doState = <T>(init :T, merge :Object) :T => Object.assign({}, init, merge);

export function counterReducer(state: States.CounterState, action: { type: string }) {
  switch (action.type) {
    case Actions.INCREMENT:
      return doState(state, { counter: state.counter + 1 });
    case Actions.DECREMENT:
      return doState(state, { counter: state.counter - 1 });
    default:
      return state;
  }
}

export function artistReducer(state :States.ArtistState, action :any) {
  switch (action.type) {
    case Actions.INITIALISE:
      let artists = Cache.selectObject(Cache.ARTISTS_KEY);
      return doState(state, { artists, index: 0 });
    case Actions.PICK_ARTIST:
      return doState(state, { index: action.index})
    default:
      return state;
  }
}

export default (state :States.AppState, action :any ) => {
  if (!state) {
    state = States.buildDefaultState()
  }

  let counterState = counterReducer(state.counterState, action);
  let artistState = artistReducer(state.artistState, action);

  return doState(state, {counterState, artistState})
}