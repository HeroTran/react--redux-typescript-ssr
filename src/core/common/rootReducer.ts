import { combineReducers } from 'redux';

import { commonReducer, CommonState } from '@core/features/common';

export interface AppState {
  common: CommonState;
}

export const rootReducer = combineReducers<AppState>({
  common: commonReducer
});
