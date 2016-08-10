/*
 * action types
 */
export const LAYERS_TO_DEFAULT = 'LAYERS_TO_DEFAULT'
export const START_FETCHING_LAYERS = 'START_FETCHING_LAYERS'
export const ERROR_FETCHING_LAYERS = 'ERROR_FETCHING_LAYERS'
export const SET_LAYERS = 'SET_LAYERS'
export const TEMP_FILTER_TO_DEFAULT = 'TEMP_FILTER_TO_DEFAULT'
export const GROUPS_TO_DEFAULT = 'GROUPS_TO_DEFAULT'
export const SELECTION_TO_DEFAULT = 'SELECTION_TO_DEFAULT'
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
export const UPDATE_STEP = 'UPDATE_STEP'
export const UPDATE_SELECTED_COUNTRY = 'UPDATE_SELECTED_COUNTRY'
export const UPDATE_LAYER_GEOJSON = 'UPDATE_LAYER_GEOJSON'
export const SET_MAP_INTERSECT = 'SET_MAP_INTERSECT'
export const SET_POPULATION = 'SET_POPULATION'
export const SET_TIER_1_PRICE = 'SET_TIER_1_PRICE'
export const SET_TIER_2_PRICE = 'SET_TIER_2_PRICE'

/*
 * bare action creators
 */

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
    case 'selection':
      return { type: SELECTION_TO_DEFAULT }
    default:
      return { type: BAD_ACTION }
  }
}

export function startFetchingLayers () {
  return { type: START_FETCHING_LAYERS }
}

export function errorFetchingLayers (err) {
  return { type: ERROR_FETCHING_LAYERS, error: err }
}

export function setLayers (layers) {
  return { type: SET_LAYERS, layers: layers }
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
 * this is only applicable to the layer outline
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

export function successfulLogin (token, user) {
  return { type: SUCCESSFUL_LOGIN, token, user }
}

export function badLogin (error) {
  return { type: BAD_LOGIN, error: error }
}

export function logout () {
  return { type: LOGOUT }
}

/*
 * update the "step" shown by the tool
 */
export function updateStep (id) {
  return { type: UPDATE_STEP, data: id }
}

/*
 * update the selected country
 */

export function updateSelectedCountry (country) {
  return { type: UPDATE_SELECTED_COUNTRY, data: country }
}

/*
 * update the selected layer geojson
 */

export function updateLayerGeoJSON (id, geojson) {
  return { type: UPDATE_LAYER_GEOJSON, data: { id, geojson } }
}

/*
 * store the map intersection GeoJSON
 */

export function setMapIntersect (geo) {
  return { type: SET_MAP_INTERSECT, data: geo }
}

/*
 * set the popuation of the intersected region
 */

export function setPopulation (pop) {
  return { type: SET_POPULATION, data: pop }
}

/*
 * set prices for different population tiers
 */

export function setTier1Price (price) {
  return { type: SET_TIER_1_PRICE, data: price }
}

export function setTier2Price (price) {
  return { type: SET_TIER_2_PRICE, data: price }
}
