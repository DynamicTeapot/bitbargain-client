import { sellPost, SELL_SUCCESS, SELL_POST } from '../../app/actions/sellitem.action';
import { sellItemReducer } from '../../app/reducers/sellitem.reducer.js';

describe('sellitem reducer', () => {
  it('should return initial state', () => {
    const result = sellItemReducer(undefined, {});
    expect(result).toEqual({ status: 'idle' });
  });

  it('should change status to success', () => {
    const result = sellItemReducer({ status: 'loading' }, { type: SELL_SUCCESS });
    expect(result.status).toEqual('success');
  });

  it('should change status to loading', () => {
    const result = sellItemReducer({ status: 'success' },
      { type: SELL_POST });
    expect(result.status).toEqual('loading');
  });
});



