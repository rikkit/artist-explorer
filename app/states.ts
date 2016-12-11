export interface Artist {
  name :string;
  mbid :string;
  country :string;
  playcount :number;
  imageUrl :string;
  bioHtml :string;
}

export interface AppState {
  counterState :CounterState
  artistState :ArtistState
}

export interface CounterState {
  counter :number;
}

export interface ArtistState {
  artists :Artist[];
  index: 0
}

export function buildDefaultState() : AppState {
  return { 
    counterState: {
      counter: 0
    },
    artistState: {
      index: 0,
      artists: [
        {
          name: '',
          mbid: '',
          country: '',
          playcount: null,
          imageUrl: 'https://i.imgur.com/XHce5GF.jpg',
          bioHtml: ''
        }
      ]
    }
  }
}