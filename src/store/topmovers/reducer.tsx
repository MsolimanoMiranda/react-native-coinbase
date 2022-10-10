import Coin from '../../models/Coin';
import { SAVE } from './actionTypes';

export interface TopmoversState {
  topMoversData: Coin[];
}

const initialState: TopmoversState = {
  topMoversData: []
};
export interface IAction {
  type: string;
  coinData: any;
}

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case SAVE:
      return {
        topMoversData: action.coinData
      };
  }
  return state;
}