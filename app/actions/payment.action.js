/*
 * Action Types
 */
export const MAKE_PAYMENT = 'MAKE_PAYMENT';
export const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS';
export const PAYMENT_FAILURE = 'PAYMENT_FAILURE';


export function paymentHandler(res, status) {
  return dispatch => dispatch({ type: status, payload: res });
}


/*
 * Action Creators
 */
export function makePayment(product) {
  return (dispatch) => {
    const options = {
      credentials: 'include',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    };

    fetch('/api/payments', options)
      .then(res => res.json())
      .then(res => dispatch(paymentHandler(res, PAYMENT_SUCCESS)))
      .catch(e => dispatch(paymentHandler(e, PAYMENT_FAILURE)));
  };
}
