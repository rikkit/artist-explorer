import * as React from 'react';
import ArtistView from './artistview';
import NextUp from './nextup';

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="root">
        <header>
          <h1>Artist Explorer</h1>
        </header>
        <div className="now-playing">
          <ArtistView/>
        </div>
        <NextUp />
      </div>
    );
  }
}
