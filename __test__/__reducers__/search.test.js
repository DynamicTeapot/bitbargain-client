import { UPDATE_RESULTS, CLEAR_RESULTS } from '../../app/actions/search.action';
import { searchReducer } from '../../app/reducers/search.reducer';

describe('search reducer', () => {
  const product = {
    title: 'This is the name of a product',
    seller: 'SELLER NAME',
    description: 'This is a desc of a product',
    category: 'chicken',
    created_at: new Date().toString(),
    price: '1000',
    location: null,
    post: null,
    id: null,
    images: ['http://lorempixel.com/output/nature-q-c-640-480-10.jpg']
  };

  it('should return initial state', () => {
    const result = searchReducer(undefined, {});
    expect(result).toEqual({ parameters: [], results: [] });
  });

  it('should update results', () => {
    const result = searchReducer({},
      { type: UPDATE_RESULTS, results: [product] });
    expect(result.results[0]).toEqual(product);
  });

  it('should clear results', () => {
    const result = searchReducer({ parameters: [], results: [product] },
      {type: CLEAR_RESULTS});
    expect(result).toEqual({ parameters: [], results: [] });
  });
});

