import {
  GET_SUGGESTIONS,
  CLEAR_SUGGESTIONS
} from '../../app/actions/getSuggestions.action';

import { suggestionsReducer } from '../../app/reducers/suggestions.reducer.js';

describe('suggestions reducer', () => {
  it('should return initial state', () => {
    const result = suggestionsReducer(undefined, {});
    expect(result).toEqual({ suggestion: [] });
  });

  it('should clear suggestions', () => {
    const result = suggestionsReducer({ suggestion: ['aproduct'] },
      { type: CLEAR_SUGGESTIONS });
    expect(result.suggestion.length).toEqual(0);
  });

  it('should update suggestions', () => {
    const result = suggestionsReducer({ suggestion: [] },
      { type: GET_SUGGESTIONS, data: ['dogs'] });
    expect(result.suggestion[0]).toEqual('dogs');
  });
});



