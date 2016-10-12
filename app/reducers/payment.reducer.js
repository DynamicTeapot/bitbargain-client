import { goBack } from 'react-router-redux';
import {
  MAKE_PAYMENT,
  PAYMENT_SUCCESS,
  PAYMENT_FAILURE,
  makePayment
} from '../actions/payment.action';


const stateInit = {
  payment: undefined,
  product: undefined,
  reason: undefined
};


export function paymentReducer(state = stateInit, action) {
  const newState = {};

  if (action.type === MAKE_PAYMENT) {
    return Object.assign(newState, state, { payment: 'PENDING' });
  } else if (action.type === PAYMENT_FAILURE) {
    return Object.assign(newState, state, { payment: 'FAILURE', reason: action.payload });
  } else if (action.type === PAYMENT_SUCCESS) {
    return Object.assign(newState, state, { payment: 'SUCCESS', product: action.payload });
  }

  return state;
}

export function mapDispatchToProps(dispatch) {
  return {
    makePayment: product => dispatch(makePayment(product)),
    goBack: () => dispatch(goBack())
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
