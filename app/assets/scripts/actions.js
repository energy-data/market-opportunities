/*
 * action types
 */
export const UPDATE_FOO = 'UPDATE_FOO'
export const UPDATE_BAR = 'UPDATE_BAR'
export const REDUCER_TO_DEFAULT = 'REDUCER_TO_DEFAULT'
export const BAD_ACTION = 'BAD_ACTION'

/*
 * bare action creators
 */

 /*
 * Update foo
 */
export function updateFoo (foo) {
  return { type: UPDATE_FOO, data: foo }
}

/*
 * Update bar
 */
export function updateBar (bar) {
  return { type: UPDATE_BAR, data: bar }
}

/*
 * Reset a portion of the state to its initial state
 */
export function resetState (portion) {
  switch (portion) {
    case 'reducer':
      return { type: REDUCER_TO_DEFAULT }
    default:
      return { type: BAD_ACTION }
  }
}
