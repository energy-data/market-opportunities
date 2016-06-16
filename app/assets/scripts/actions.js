/*
 * action types
 */
export const UPDATE_FOO = 'UPDATE_FOO'
export const UPDATE_BAR = 'UPDATE_BAR'
export const LAYERS_TO_DEFAULT = 'LAYERS_TO_DEFAULT'
export const TEMP_FILTER_TO_DEFAULT = 'TEMP_FILTER_TO_DEFAULT'
export const GROUPS_TO_DEFAULT = 'GROUPS_TO_DEFAULT'
export const BAD_ACTION = 'BAD_ACTION'
export const UPDATE_VISIBLE_LAYERS = 'UPDATE_VISIBLE_LAYERS'
export const START_EDITING_LAYER = 'START_EDITING_LAYER'
export const STOP_EDITING_LAYER = 'STOP_EDITING_LAYER'
export const TOGGLE_LAYER_VISIBILITY = 'TOGGLE_LAYER_VISIBILITY'
export const UPDATE_LAYER_FILTER = 'UPDATE_LAYER_FILTER'
export const UPDATE_TEMP_FILTER = 'UPDATE_TEMP_FILTER'
export const TOGGLE_OPEN_GROUP = 'TOGGLE_OPEN_GROUP'
export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const SUCCESSFUL_LOGIN = 'SUCCESSFUL_LOGIN'
export const BAD_LOGIN = 'BAD_LOGIN'
export const LOGOUT = 'LOGOUT'
export const USER_TO_DEFAULT = 'USER_TO_DEFAULT'

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
    case 'user':
      return { type: USER_TO_DEFAULT }
    case 'layers':
      return { type: LAYERS_TO_DEFAULT }
    case 'tempFilter':
      return { type: TEMP_FILTER_TO_DEFAULT }
    case 'groups':
      return { type: GROUPS_TO_DEFAULT }
    default:
      return { type: BAD_ACTION }
  }
}

/*
 * Update the visible layers in the side panel
 */

export function updateVisibleLayers (visible) {
  return { type: UPDATE_VISIBLE_LAYERS, data: visible }
}

/*
 * Change the editing status of a layer to true
 */

export function startEditingLayer (id) {
  return { type: START_EDITING_LAYER, data: id }
}

/*
 * Change the editing status of a layer to false
 */

export function stopEditingLayer (id) {
  return { type: STOP_EDITING_LAYER, data: id }
}

/*
 * Toggle the visible status of a layer
 */

export function toggleLayerVisibility (id) {
  return { type: TOGGLE_LAYER_VISIBILITY, data: id }
}

/*
 * update the filter for a layer
 */

export function updateLayerFilter (id, filter) {
  return { type: UPDATE_LAYER_FILTER, data: {id, filter} }
}

/*
 * update the temporary filter (stored in case we cancel/reset)
 */

export function updateTempFilter (filter) {
  return { type: UPDATE_TEMP_FILTER, data: filter }
}

/*
 * toggle the open status of a particular group
 */

export function toggleOpenGroup (group) {
  return { type: TOGGLE_OPEN_GROUP, data: group }
}

export function requestLogin () {
  return { type: REQUEST_LOGIN }
}

export function successfulLogin (token) {
  return { type: SUCCESSFUL_LOGIN, token: token }
}

export function badLogin (error) {
  return { type: BAD_LOGIN, error: error }
}

export function logout () {
  return { type: LOGOUT }
}
