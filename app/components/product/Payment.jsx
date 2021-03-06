import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { mapStateToProps, mapDispatchToProps } from '../../reducers/payment.reducer';
import commaNumber from 'comma-number';

class PaymentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      fee: 0,
      total: 0
    }
    this.prettifyNumber = num => {
      let retval = num.toFixed(2);
      retval = retval.toString();
      retval = retval.split('.');
      retval[0] = commaNumber(retval[0]);
      return '$' + retval.join('.');
    }
  }
  componentWillMount() {
    this.props.updateProduct(this.props.params.id);
  }
  componentWillUnmount() {
    this.props.clearProduct();
    this.props.clearPayment();
  }
  componentWillReceiveProps(nextProps) {
    let newState = {
      price: Number(nextProps.product.price),
      fee: ((Number(nextProps.product.price) || 0) * .01)
    }
    this.setState({
      price: newState.price,
      fee: newState.fee,
      total: newState.price + newState.fee
    });
    if (nextProps.payment.payment && nextProps.payment.product && nextProps.payment.reason) {
      $('#result').openModal({
        dismissible: false, // Modal can be dismissed by clicking outside of the modal
        opacity: .2, // Opacity of modal background
        in_duration: 50, // Transition in duration
        out_duration: 50,
      });
    }
  }
  render () {
    return (
      <div className="container">
        <div className='card-panel'>
          <div className='row'>
            <table className="highlight right">
              <thead>
                <tr>
                    <th data-field="name">Item</th>
                    <th data-field="price" className="right">Cost</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>{this.props.product.title}</td>
                  <td className="right">{this.prettifyNumber(this.state.price)}</td>
                </tr>
                {/*<tr>
                  <td>Shipping</td>
                  <td>Uber Rush Pricing</td>
                </tr>*/}
                <tr>
                  <td>Fee</td>
                  <td className="right">{this.prettifyNumber(this.state.fee)}</td>
                </tr>
                  <tr style={{borderTop:'1px solid', borderColor:'#D3D3D3'}}>
                    <td><b>Total</b></td>
                    <td className="right"><b>{this.prettifyNumber(this.state.total)}</b></td>
                  </tr>
              </tbody>
            </table>
          </div>
          <div className="row">
            <a onClick={() => {this.props.makePayment(this.props.product)}} className="btn-floating btn-large waves-effect waves-light green right"><i className="material-icons">done</i></a>
            <a onClick={this.props.goBack} className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">close</i></a>
          </div>
        </div>
         <div id="result" className="modal">
          <div className="modal-content">
            <h4>{this.props.payment.payment}</h4>
            {this.props.payment.product}
            <hr/>
            {this.props.payment.reason ? this.props.payment.reason.toString() : ''}
          </div>
          <div className="modal-footer">
            <Link to='/' className=" modal-action modal-close waves-effect waves-green btn-flat">O K</Link>
          </div>
        </div>
      </div>

    )
  }
};

const Payment = connect(mapStateToProps, mapDispatchToProps)(PaymentContainer);

export default Payment;
