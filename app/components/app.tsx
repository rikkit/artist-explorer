import * as React from 'react';
import Counter from './counter';

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="root">
        <header>
          <h1>Artist Explorer</h1>
        </header>
        <div className="now-playing">
          <div className="media-wrap">

          </div>
          <div className="media-info">
            <Counter />            
          </div>
        </div>
      </div>
    );
  }
}
