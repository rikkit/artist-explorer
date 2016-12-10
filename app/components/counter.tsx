import * as React from 'react';
import { connect } from 'react-redux';

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

const mapStateToProps = (state: number) => {
  return { count: state };
};

const mapDispatchToProps = dispatch => {
  return {
    onPlusClick: () => dispatch({ type: 'INCREMENT' }),
    onMinusClick: () => dispatch({ type: 'DECREMENT' })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseCounter);
