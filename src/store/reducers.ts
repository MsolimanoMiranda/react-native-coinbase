

import watchlistReducer from './watchlist/reducer';
import topmoversReducer from './topmovers/reducer';
import newsReducer from './news/reducer';
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
  watchlist: watchlistReducer,
  topmovers: topmoversReducer,
  news: newsReducer
});

export default rootReducer;