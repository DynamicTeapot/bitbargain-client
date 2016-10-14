import {
  clearSuggestions,
  fetchSuggestions,
  GET_SUGGESTIONS,
  CLEAR_SUGGESTIONS
} from '../actions/getSuggestions.action';


export function suggestionsReducer(state = { suggestion: [] }, action) {
  if (action.type === GET_SUGGESTIONS) {
    return Object.assign({}, state, { suggestion: action.data });
  } else if (action.type === CLEAR_SUGGESTIONS) {
    return Object.assign({}, state, { suggestion: [] });
  }
  return state;
}


export function mapDispatchToProps(dispatch) {
  return {
    fetchSuggestions: () => dispatch(fetchSuggestions()),
    clearSuggestions: () => {
      dispatch(clearSuggestions());
    }
  };
}
