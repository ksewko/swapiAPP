import { createAction, props } from '@ngrx/store';

export const spinnerOn = createAction('spinnerOn');
export const spinnerOff = createAction('spinnerOff');

export const gameStarted = createAction('gameStarted');

export const scoreIncrement = createAction(
  'scoreIncrement',
  props<{ playerNumber: number }>()
);
export const battleDrawScore = createAction('battleDrawScore');

export const resetStore = createAction('resetScore');
