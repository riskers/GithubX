export const ACTION_SHOW_OPTION_PAGE = 'ACTION_SHOW_OPTION_PAGE';
export const INTERCEPT_GETSTARINFO_B2C = 'INTERCEPT_GETSTARINFO_B2C';
export const INTERCEPT_STARADD_C2B = 'INTERCEPT_STARADD_C2B';
export const INTERCEPT_STARADD_C2B_DONE = 'INTERCEPT_STARADD_C2B_DONE';
export const INTERCEPT_INTO_PAGE = 'INTERCEPT_INTO_PAGE';

const ACTIONS = [
  ACTION_SHOW_OPTION_PAGE,
  INTERCEPT_GETSTARINFO_B2C,
  INTERCEPT_STARADD_C2B,
  INTERCEPT_STARADD_C2B_DONE,
  INTERCEPT_INTO_PAGE,
] as const;

export interface IAction<T> {
  type: typeof ACTIONS[number];
  payload?: T;
}
