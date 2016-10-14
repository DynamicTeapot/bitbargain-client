import {
  UPDATE_PRODUCT,
  fetchItem,
  CLEAR_PRODUCT
} from '../actions/product.action';

const productInit = {
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

export function productReducer(state = productInit, action) {
  const dispatch = action.type;

  if (dispatch === UPDATE_PRODUCT) {
    // Should only be used to change info on the current products
    return Object.assign({}, action.product);
  }
  if (dispatch === CLEAR_PRODUCT) {
    return productInit;
  }
  return state;
}

export function mapStateToProps(state) {
  return {
    product: state.product,
    loggedIn: state.login.loggedIn,
    user: state.login.user
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    updateProduct: itemID => dispatch(fetchItem(itemID)),
    clearProduct: () => dispatch({ type: CLEAR_PRODUCT })
  };
}
