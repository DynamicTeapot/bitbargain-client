import {
  MAKE_PAYMENT,
  PAYMENT_SUCCESS,
  PAYMENT_FAILURE
} from '../../app/actions/payment.action';
import { paymentReducer } from '../../app/reducers/payment.reducer';


test('should return initial state', () => {
  expect(paymentReducer(undefined, {})).toEqual({
    payment: undefined,
    product: undefined,
    reason: undefined
  });
});
