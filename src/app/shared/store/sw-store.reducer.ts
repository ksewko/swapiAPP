import { createReducer, on } from '@ngrx/store';
import {
  battleDrawScore,
  gameStarted,
  resetStore,
  scoreIncrement,
  spinnerOff,
  spinnerOn,
} from './sw-store.actions';
import { initialState } from './sw-store';

const _swapiReducer = createReducer(
  initialState,
  on(spinnerOn, (state) => {
    return {
      ...state,
      inProgress: true,
    };
  }),
  on(spinnerOff, (state) => {
    return {
      ...state,
      inProgress: false,
    };
  }),
  on(gameStarted, (state) => {
    return {
      ...state,
      isGameStarted: true,
    };
  }),
  on(battleDrawScore, (state) => {
    return {
      ...state,
      player1Score: state.player1Score + 1,
      player2Score: state.player2Score + 1,
    };
  }),
  on(scoreIncrement, (state, action) => {
    const key = action.playerNumber === 1 ? 'player1Score' : 'player2Score';
    return {
      ...state,
      [key]: state[key] + 1,
    };
  }),
  on(resetStore, () => {
    return {
      inProgress: initialState.inProgress,
      player1Score: initialState.player1Score,
      player2Score: initialState.player2Score,
      isGameStarted: initialState.isGameStarted
    };
  })
);

export function swapiReducer(state: any, action: any) {
  return _swapiReducer(state, action);
}
