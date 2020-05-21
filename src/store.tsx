import { AnyAction, createStore } from 'redux';

const CHECK_ASSET = 'CHECK_ASSET';

export const setAsset = (lat: number, lng: number) => ({
  type: CHECK_ASSET, lat, lng,
});

export interface State {
  lat: number;
  lng: number;
}

const initialState: State = {
  lat: 50.447731,
  lng: 31.542721,
};

const reducer = (state = initialState, action: AnyAction) => {
  if (action.type === CHECK_ASSET) {
    return {
      ...state,
      lat: +action.lat,
      lng: +action.lng,
    };
  }

  return state;
};

const store = createStore(reducer, initialState);

export default store;
