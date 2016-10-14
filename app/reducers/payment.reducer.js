import { goBack } from 'react-router-redux';
import {
  MAKE_PAYMENT,
  PAYMENT_SUCCESS,
  PAYMENT_FAILURE,
  CLEAR_PAYMENT,
  makePayment
} from '../actions/payment.action';
import {
  UPDATE_PRODUCT,
  CLEAR_PRODUCT,
  fetchItem
} from '../actions/product.action';

const stateInit = {
  payment: undefined,
  product: undefined,
  reason: undefined
};


export function paymentReducer(state = stateInit, action) {
  if (action.type === MAKE_PAYMENT) {
    return Object.assign(
      {},
      state,
      { payment: 'Pending', product: '', reason: '' }
    );
  } else if (action.type === PAYMENT_FAILURE) {
    return Object.assign(
      {},
      state,
      {
        payment: 'Failure',
        product: `Failed to purchase product.\n 
        Try refreshing the page, ensure you are logged in, \n 
        and that you have enough money in your wallet.`,
        reason: action.payload
      }
    );
  } else if (action.type === PAYMENT_SUCCESS) {
    return Object.assign(
      {},
      state,
      {
        payment: 'Success',
        product: action.payload,
        reason: `Your payment has been sent to the seller, 
        please contact them to receive your item.`
      }
    );
  } else if (action.type === CLEAR_PAYMENT) {
    return Object.assign(
      {},
      state,
      {
        payment: undefined,
        product: undefined,
        reason: undefined
      }
    );
  }

  return state;
}

export function mapDispatchToProps(dispatch) {
  return {
    makePayment: product => dispatch(makePayment(product)),
    clearPayment: () => dispatch({ type: CLEAR_PAYMENT }),
    goBack: () => dispatch(goBack()),
    updateProduct: itemID => dispatch(fetchItem(itemID)),
    clearProduct: () => dispatch({ type: CLEAR_PRODUCT, product: {} })
  };
}
export function mapStateToProps(state) {
  return {
    product: state.product,
    loggedIn: state.login.loggedIn,
    user: state.login.user,
    payment: state.payment
  };
}
