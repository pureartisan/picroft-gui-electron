import { combineReducers } from 'redux';

import { skills } from './skills';

export const rootReducer = combineReducers({
  skills
});

export type ReduxState = ReturnType<typeof rootReducer>;
