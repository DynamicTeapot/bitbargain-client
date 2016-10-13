import { CLEAR_RESULTS, UPDATE_RESULTS } from '../actions/search.action';

const searchInit = {
  parameters: [],
  results: []
};

/**
 * @name searchReducer
 * @desc Given an initial state and an action, update
 * @param {object} [state=searchInit] - An object representing an initial state.
 * @param {object} action - An object representing an action.
 * @return {object}
 */
export const searchReducer = (state = searchInit, action) => {
  const dispatch = action.type;

  if (dispatch === UPDATE_RESULTS) {
    return Object.assign({}, state, { results: action.results });
  } else if (dispatch === CLEAR_RESULTS) {
    return Object.assign({}, searchInit);
  }
  return state;
};

export const mapStateToProps = state => ({
  parameters: state.search.parameters,
  results: state.search.results
});

export const mapDispatchToProps = dispatch => ({
  clearResults: () => {
    dispatch({ type: CLEAR_RESULTS });
  },
  updateResults: (data) => {
    dispatch({ type: UPDATE_RESULTS, results: data });
  }
});
