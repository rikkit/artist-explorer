import * as React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import * as States from '../states';

interface ArtistProps {
    artistState :States.ArtistState
    onHeaderClick: (index) => any
}

const BaseCounter: React.StatelessComponent<CounterProps> = (props: ArtistProps) => {
  let artists = props.artistState.artists;  
  
  return (
    <div className="next-up">
      <header>
        <h1>Next ></h1>
      </header>
      <ul className={"next-items"}>{
        artists.map((artist, index) => {
          let bgStyle = {
            backgroundImage: "url(" + artist.imageUrl + ")"
          };
          return (
            <li style={bgStyle}>
              <a onClick={() => props.onHeaderClick(index)}><h2>{artist.name}</h2></a>
            </li>
          )
        })
      }</ul>
    </div>
  )
};

const mapStateToProps = (state: States.AppState) => {
  return { artistState: state.artistState };
};

const mapDispatchToProps = dispatch => {
  return {
    onHeaderClick: (index) => dispatch({ type: Actions.PICK_ARTIST, index })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseCounter);
