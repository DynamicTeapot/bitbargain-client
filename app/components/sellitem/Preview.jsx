import React from 'react';
import { CardTitle, CardImage, CardAction, CardReveal } from '../product/components/CardComponents.jsx';
import constants from '../product/ProductEnums';

class MockProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: constants.default
    };
  }
  toggleState(userEnum) {
    this.setState({role: userEnum})
  }
  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col s12 m12 l12">
              <div className="card sticky-action">
                <CardTitle product={this.props.product} user={this.state.role}/>
                <CardImage product={this.props.product} user={this.state.role}/>
                <CardReveal product={this.props.product} user={this.state.role}/>
                <CardAction product={this.props.product} user={this.state.role} loggedIn={false}/>
              </div>
            </div>
          </div>
        </div>
    )
  }
}
        // <a className='btn' onClick={ ()=>{this.toggleState(constants.default)} }>Guest</a>
        // <a className='btn' onClick={ ()=>{this.toggleState(constants.buyer)} }>Purchased View</a>
        // <a className='btn' onClick={ ()=>{this.toggleState(constants.seller)} }>Editor View</a>

export default MockProduct;