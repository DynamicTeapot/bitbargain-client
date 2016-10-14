import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import item from '../schema';
import Default from '../components/product/DefaultProduct.jsx';
import Buyer from '../components/product/BuyerProduct.jsx';
import Seller from '../components/product/SellerProduct.jsx';
import {
  mapStateToProps,
  mapDispatchToProps,
  productReducer
} from '../reducers/product.reducer';
import enums from '../components/product/ProductEnums';
// TODO: Get this to check current product first before loading.
// TODO: This should redirect in the event of an error.

class productContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userRole: ''
    };
    // this.buyButtonHandler = this.buy.bind(this);
    this.initCarousel = () => {
      const $carousel = $('.carousel.carousel-slider');
      $carousel.carousel({
        full_width: true,
        indicators: true
      });
      // $carousel.on('click', () => $carousel.carousel('next'));
    };
  }
  componentWillMount() {
    this.props.updateProduct(this.props.params.id);
  }
  componentDidMount() {
    this.initCarousel();
  }
  componentWillReceiveProps(nextProps) {
    fetch(`/api/items/${this.props.params.id}/${this.props.user}/transaction`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then((res) => {
        this.setState({ userRole: res.role.toUpperCase() });
      })
      .catch(err => console.log(err));
  }
  componentDidUpdate() {
    this.initCarousel();
  }
  componentWillUnmount() {
    this.props.clearProduct();
  }
  render() {
    return (
      <Default
        id={this.props.params.id}
        role={this.state.userRole}
        loggedIn={this.props.loggedIn}
        updateProduct={this.props.updateProduct}
        product={this.props.product}
      />
    );
  }
}

productContainer.propTypes = {
  product: item,
  params: PropTypes.shape({
    id: PropTypes.any
  }),
  user: PropTypes.object.isRequired,
  updateProduct: PropTypes.func.isRequired,
  clearProduct: PropTypes.func.isRequired
};

const Product = connect(mapStateToProps, mapDispatchToProps)(productContainer);

export { Product, productReducer, productContainer };
