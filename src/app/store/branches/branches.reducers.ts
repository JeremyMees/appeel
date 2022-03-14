import { Action, createReducer, on } from '@ngrx/store';
import { Branch } from 'src/app/branches/models/branch.model';
import { set } from './branches.actions';

export const initialState: Branch[] = [];

const _branchesReducer = createReducer(
  initialState,
  on(set, (state: Branch[], { branches }) => branches)
);

export function branchesReducer(
  state = initialState,
  action: Action
): Branch[] {
  return _branchesReducer(state, action);
}
