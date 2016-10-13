import React from 'react';
import item from '../../schema';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import commaNumber from 'comma-number';
import { CardTitle, CardImage, CardAction, CardReveal } from './components/CardComponents.jsx';
import enums from './ProductEnums';

const DEFAULT_WIDTH = '80%';

class DefaultProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bought: false,
      embedCode: null,
      canBuy: true,
      processing: false,
      categories: []
    };
  }
  componentDidMount() {
    try {
      this.setState({categories: this.state.categories.concat(JSON.parse('"' + this.props.product.category + '"'))});
    } catch (err) {
      var cats = this.props.product.category;
      this.setState({categories: this.state.categories.concat([cats])});
    }
    // $('.leftarrow').on('click', (e) => {
    //   $('.carousel').carousel('prev');
    // });
    // $('.rightarrow').on('click', (e) => {
    //   $('.carousel').carousel('next');
    // });
  }
  buy() {
    if (this.state.canBuy && this.props.loggedIn) {
      this.setState({ processing: true });
      fetch(`/api/items/${this.props.product.id}/buy`, {
        method: 'POST',
        mode: 'no-cors',
        credentials: 'include'
      })
    .then(resp => resp.json())
    .then((code) => {
      this.setState({ embedCode: code, bought: true, canBuy: false, processing: false });
      Materialize.toast(`Bought: ${this.props.product.title}`, 5000);
    });
    } else if (!this.props.loggedIn) {
      Materialize.toast('Must be logged in to buy item');
      this.setState({ processing: false });
    } else {
      Materialize.toast('Item has already been purchased');
      this.setState({ processing: false });
    }
  }
  render() {
    console.log(this.props)
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m12 l12">
            <div className="card sticky-action">
              <CardTitle product={this.props.product}/>
              <CardImage product={this.props.product}/>
              <CardReveal product={this.props.product}/>
              <CardAction product={this.props.product}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
DefaultProduct.propTypes = {
  product: item
};

export default DefaultProduct;
