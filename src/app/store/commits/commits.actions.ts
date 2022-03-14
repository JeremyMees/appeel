import { createAction, props } from '@ngrx/store';
import { Commit } from 'src/app/commits/models/commit.model';

export const set = createAction('Set', props<{ commits: Commit[] }>());
