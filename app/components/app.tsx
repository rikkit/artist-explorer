import * as React from 'react';
import Counter from './counter';

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <div class="root">
        <header>
          <h1>Artist Explorer</h1>
        </header>
        <div class="now-playing">
          <div class="media-wrap">

          </div>
          <div class="media-info">
            
          </div>
        </div>
        <Counter />
        <h2>Welcome!</h2>
      </div>
    );
  }
}
