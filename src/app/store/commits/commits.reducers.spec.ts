import { MOCK_COMMIT } from 'src/app/commits/data/mock-commit.data';
import * as Reducer from './commits.reducer';

describe('commitsReducer', () => {
  it('should return the default state', () => {
    const { initialState } = Reducer;
    const action = { type: 'stub' };
    const state = Reducer.commitsReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should set new state', () => {
    const action = { type: 'set' };
    const state = Reducer.commitsReducer([MOCK_COMMIT], action);
    expect(state).toEqual([MOCK_COMMIT]);
  });
});
