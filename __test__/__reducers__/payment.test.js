import {
  MAKE_PAYMENT,
  PAYMENT_SUCCESS,
  PAYMENT_FAILURE
} from '../../app/actions/payment.action';
import { paymentReducer } from '../../app/reducers/payment.reducer';


describe('payment reducer', () => {
  it('should return initial state', () => {
    expect(paymentReducer(undefined, {})).toEqual({
      payment: undefined,
      product: undefined,
      reason: undefined
    });
  });

  it('should handle MAKE_PAYMENT', () => {
    expect(paymentReducer({}, { type: MAKE_PAYMENT })).toEqual({
      payment: 'Pending',
      product: '',
      reason: ''
    });
  });
});
