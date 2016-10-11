import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { mapStateToProps } from '../reducers/payment.reducer';

const PaymentContainer = props => {
  return (
    <div className="container">
      <div className='card-panel'>
        <div className='row'>
          <table>
            <thead>
              <tr>
                  <th data-field="name">Item</th>
                  <th data-field="price">Cost</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{props.product.title}</td>
                <td>{props.product.price}</td>
              </tr>
              {/*<tr>
                <td>Shipping</td>
                <td>Uber Rush Pricing</td>
              </tr>*/}
              <tr>
                <td>Tax</td>
                <td>0.05$</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>{`${(Number(props.product.price) || 0) + .05}$`}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row">
          <a className="btn-floating btn-large waves-effect waves-light green"><i className="material-icons">done</i></a>
          <Link to={props.product.id ? `/product/${props.product.id}` : '/'} className="btn-floating btn-large waves-effect waves-light red right"><i className="material-icons">close</i></Link>
        </div>
      </div>
    </div>)
};

const Payment = connect(mapStateToProps)(PaymentContainer);

export default Payment;
