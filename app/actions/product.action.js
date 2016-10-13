export const UPDATE_PRODUCT = 'MAKE_PAYMENT';

export function fetchItem(itemID) {
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

    fetch(`/api/items/${this.props.params.id}`, options)
      .then(res => res.json())
      .then(res => dispatch(paymentHandler(res, PAYMENT_SUCCESS)))
  };
}

export const MAKE_PAYMENT = 'MAKE_PAYMENT';
export const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS';
export const PAYMENT_FAILURE = 'PAYMENT_FAILURE';


export function productHandler(res, status) {
  return dispatch => dispatch({ type: status, payload: res });
}
