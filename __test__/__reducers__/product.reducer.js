import { UPDATE_PRODUCT } from '../../app/actions/product.action';
import { productReducer } from '../../app/reducers/product.reducer';

describe('product reducer', () => {
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
    const result = productReducer(undefined, {});
    expect(result).toEqual(product);
  });

  it('should change a product on UPDATE_PRODUCT', () => {
    expect(productReducer({}, { type: UPDATE_PRODUCT, product })).toEqual(product);
  });
});

