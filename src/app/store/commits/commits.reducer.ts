import { Action, createReducer, on } from '@ngrx/store';
import { Commit } from 'src/app/commits/models/commit.model';
import { set } from './commits.actions';

export const initialState: Commit[] = [];

const _commitsReducer = createReducer(
  initialState,
  on(set, (state: Commit[], { commits }) => commits)
);

export function commitsReducer(state = initialState, action: Action): Commit[] {
  return _commitsReducer(state, action);
}
