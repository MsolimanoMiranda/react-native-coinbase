import News from '../../models/news';
import { SAVE } from './actionTypes';


export interface NewsState {
  newsData: News[];
}

const initialState: NewsState = {
  newsData: [],
}

export interface IAction {
  type: string;
  newsData: any;
}
export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case SAVE:
      return {
        newsData: action.newsData,
      };
  }
  return state;
}