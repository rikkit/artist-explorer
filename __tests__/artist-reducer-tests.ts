import renderer from 'react-test-renderer';
import * as Reducers from '../app/reducers';
import * as Actions from '../app/actions';
import * as States from '../app/states'
import Cache from '../app/cache'

beforeEach(() => {
    expect(Cache.selectObject(Cache.ARTISTS_KEY)).toBeNull();
});

afterEach(() => {
    Cache.clear();
});

let testArtists :States.Artist[] = [
    {
        name: "Tune Yards",
        mbid: "555",
        country: "US",
        playcount: 200,
        imageUrl: "http://localhost/image1.jpg",
        bioHtml: "Test artist 1"
    },
    {
        name: "Grimes",
        mbid: "777",
        country: "CA",
        playcount: 200,
        imageUrl: "http://localhost/image2.jpg",
        bioHtml: "Test artist 2"
    }
]

test('artist reducer initialises with no data', () => {

    let action = { type: Actions.INITIALISE }
    let actualState = Reducers.artistReducer(null, action);
});

test('artist reducer initialises with artists', () => {
    expect(Cache.selectObject(Cache.ARTISTS_KEY)).toBeNull();
    Cache.saveModel(Cache.ARTISTS_KEY, testArtists)

    let action = { type: Actions.INITIALISE }
    let actualState = Reducers.artistReducer(null, action);

    expect(actualState.index).toBe(0);
    let expectedArtist = testArtists[0];
    let actualArtist = actualState.artists[0];
    expect(actualArtist).toEqual(expectedArtist);
});

test('artist reducer picks artist with valid index', () => {
    Cache.saveModel(Cache.ARTISTS_KEY, testArtists)

    let actionInit = { type: Actions.INITIALISE }
    let initState = Reducers.artistReducer(null, actionInit);
    expect(initState.index).toBe(0);

    let actionPick = { type: Actions.PICK_ARTIST, index: 1 }
    let actualState = Reducers.artistReducer(initState, actionPick);

    expect(actualState.index).toBe(1);
    let expectedArtist = testArtists[1];
    let actualArtist = actualState.artists[1];
    expect(actualArtist).toEqual(expectedArtist);
});