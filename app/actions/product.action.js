export const UPDATE_PRODUCT = 'updateProduct';

export function fetchItem(itemID) {
  return (dispatch) => {


    fetch(`/api/items/${itemID}`, {
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      // set default image if none are present
      if (!res.images) {
        const newRes = res;
        newRes.images = ['http://lorempixel.com/output/nature-q-c-640-480-10.jpg'];
        return newRes;
      }
      return res;
    })
    .then(res => dispatch(productHandler(res, UPDATE_PRODUCT)))
    .catch(err => console.log(err));
  };
}



export function productHandler(res, status) {
  return dispatch => dispatch({ type: status, product: res });
}
