import * as React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import * as States from '../states';

interface CounterProps {
  count: number,
  onPlusClick: () => any,
  onMinusClick: () => any
}

const BaseCounter: React.StatelessComponent<CounterProps> = (props: CounterProps) => (
  <div>
    <h2>Redux Counter:</h2>
    <p>
      <button onClick={props.onMinusClick}>-</button>
      {props.count}
      <button onClick={props.onPlusClick}>+</button>
    </p>
  </div>
);

const mapStateToProps = (state: States.AppState) => {
  return { count: state.counterState.counter };
};

const mapDispatchToProps = dispatch => {
  return {
    onPlusClick: () => dispatch({ type: Actions.INCREMENT }),
    onMinusClick: () => dispatch({ type: Actions.DECREMENT })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseCounter);
