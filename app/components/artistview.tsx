import * as React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import * as States from '../states';
import Counter from './counter';

interface ArtistProps {
    artistState :States.ArtistState
    onPlusClick: () => any
    onMinusClick: () => any
}

const BaseCounter: React.StatelessComponent<CounterProps> = (props: ArtistProps) => {
  let index = props.artistState.index;
  let artist = props.artistState.artists[index];
  let bgStyle = {
    backgroundImage: "url(" + artist.imageUrl + ")"
  };
  
  return (
    <div className="media-wrap" style={bgStyle}>
      <header>
        <h1>{artist.name}</h1>
      </header>
      
      <div className={"media-info"}>
        <Counter />
      </div>
    </div>
  )
};

const mapStateToProps = (state: States.AppState) => {
  return { artistState: state.artistState };
};

const mapDispatchToProps = dispatch => {
  return {
    onPlusClick: () => dispatch({ type: Actions.INCREMENT }),
    onMinusClick: () => dispatch({ type: Actions.DECREMENT })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseCounter);
