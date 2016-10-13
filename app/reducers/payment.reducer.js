import { goBack } from 'react-router-redux';
import {
  MAKE_PAYMENT,
  PAYMENT_SUCCESS,
  PAYMENT_FAILURE,
  makePayment
} from '../actions/payment.action';
import {
  UPDATE_PRODUCT,
  fetchItem
} from '../actions/product.action';

const stateInit = {
  payment: undefined,
  product: undefined,
  reason: undefined
};


export function paymentReducer(state = stateInit, action) {
  const newState = {};

  if (action.type === MAKE_PAYMENT) {
    return Object.assign(newState, state, { payment: 'Pending', product: '', reason: ''});
  } else if (action.type === PAYMENT_FAILURE) {
    return Object.assign(newState, state, { payment: 'Failure', product: 'Failed to purchase product... \n This is likely our fault, we have developers working to fix the issue! \n Try refreshing the page, ensure you are logged in, \n and that you have enough money in your wallet.', reason: action.payload });
  } else if (action.type === PAYMENT_SUCCESS) {
    return Object.assign(newState, state, { payment: 'Success', product: action.payload, reason:'Your payment has been sent to the seller, please contact them to receive your item.'});
  }

  return state;
}

export function mapDispatchToProps(dispatch) {
  return {
    makePayment: product => dispatch(makePayment(product)),
    goBack: () => dispatch(goBack()),
    updateProduct: itemID => dispatch(fetchItem(itemID)),
    clearProduct: () => dispatch({ type: 'CLEAR', product: {} })
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
