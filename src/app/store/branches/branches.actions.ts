import { createAction, props } from '@ngrx/store';
import { Branch } from 'src/app/branches/models/branch.model';

export const set = createAction('Set', props<{ branches: Branch[] }>());
