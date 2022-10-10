

import Coin from '../../models/Coin';
import { SAVE, FETCH } from './actionTypes';

export interface WatchlistState {
  watchlistData: Coin[];
}

const initialState: WatchlistState = {
  watchlistData: []
}

export interface IAction {
  type: string;
  coinData: any;
}

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case SAVE:
      return {
        watchlistData: action.coinData
      }
    case FETCH:
      return {
        ...state
      };
    default:
      return state;
  }
}