import * as Reducer from './branches.reducers';
import { MOCK_BRANCH } from 'src/app/branches/data/mock-branch.data';

describe('branchesReducer', () => {
  it('should return the default state', () => {
    const { initialState } = Reducer;
    const action = { type: 'stub' };
    const state = Reducer.branchesReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should set new state', () => {
    const action = { type: 'set' };
    const state = Reducer.branchesReducer([MOCK_BRANCH], action);
    expect(state).toEqual([MOCK_BRANCH]);
  });
});
