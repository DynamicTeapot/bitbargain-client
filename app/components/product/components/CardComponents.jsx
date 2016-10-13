import React from 'react';
import { Link } from 'react-router';
import constants from '../ProductEnums.js';
const DEFAULT_WIDTH = constants.DEFAULT_WIDTH;

const CardTitle = props => {
  return (
  <div className="card-content">
    <center><span className="card-title grey-text text-darken-4 activator truncated flow-text">
      { props.product.title }
    </span></center>
    <div className="right-align" style={{zIndex:1}}>
      {constants.prettifyNumber(props.product.price)}
    </div>
  </div>
  );
};

class CardImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullsize: false,
      imageIndex: 0
    }
  }
  imageClick(index) {
    let nextIndex;
    if (index) {
      nextIndex = (index + 1) % this.props.product.images.length;
    } else {
     nextIndex = (this.state.imageIndex + 1) % this.props.product.images.length;
    }
    this.setState({imageIndex: nextIndex, fullsize: true});
  }
  imageHover(e) {
    if (this.props.product.images.length > 1) {
      $(e.target).animate({ opacity: 0.7 }, 100);
    }
  }
  imageUnhover(e) {
    // $(e.target).animate({ opacity: 1 }, 100);
    this.setState({fullsize: false});
  }
  render() {
    return (
      <div className="card-image waves-effect waves-block waves-light valign-wrapper" style={this.state.fullsize ? {overflow:'hidden'} : {maxHeight:300, overflow:'hidden'}}>
        { this.state.fullsize ?
          (<img className="responsive-img hoverable valign" onClick={() => {this.imageClick(null)}} onMouseOut={this.imageUnhover.bind(this)} src={this.props.product.images[this.state.imageIndex]}/>)
        : 
          this.props.product.images.map((imgSrc,index,imgs) => {
            return (<img key={index} className="hoverable valign" onClick={() => {this.imageClick(index)}} src={imgSrc} style={{float:'left',width:`${100/imgs.length}%`}}/>)
          })
        }
      </div>
  );
  }
};

const CardReveal = props => {
  return (
    <div className="card-reveal">
      <span className="card-title grey-text text-darken-4">{props.product.title}<i className="material-icons right">close</i></span>
      <div>
        {props.product.description}<br />
        <div className="divider" />
        <h5>{props.product.location}</h5><br />
        {`Submitted on ${(new Date(props.product.created_at)).toLocaleString()}`}<br />
        {`Last Updated ${(new Date(props.product.updated_at)).toLocaleString()}`}<br />
      </div>
    </div>
    )
};

class CardAction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: this.props.product.price
    };
    this.DEFAULT_BUTTON = (
      <Link to={`/payment/${props.product.id}`} className='waves-effect waves-light btn-floating'>
        <i className="material-icons">add_shopping_cart</i>
      </Link>
    );
    this.EDIT_BUTTON = '';
    this.CANCEL_BUTTON = (
      <a className={`btn-floating btn-large waves-effect waves-light green accent-3 right`} onClick={() => console.log('canceled')}>
        <i className="material-icons">cancel</i>
      </a>
    );
    this.NO_BUTTON = (
      <div>
        <a className='waves-effect waves-light btn-floating btn-large btn-button tooltipped disabled' data-position="top" data-delay="50" data-tooltip="Please log in to purchase">
          <i className="material-icons">add_shopping_cart</i>
        </a>
      </div>
    );
  }
  componentDidMount() {
    $('.tooltipped').tooltip({delay: 10});
  }
  componentWillReceiveProps(nextProps) {
    this.setState({price: nextProps.product.price});
  }
  render() {
    return (
      <div className="card-action">
        <blockquote>
          {this.props.product.description}
        </blockquote>
        <div className="right-align">
          { //Things on the same tabbing correlate to if it's true then the other happens
            this.props.loggedIn ?
              this.props.user === constants.buyer ? 
              this.CANCEL_BUTTON : 
                this.props.user === constants.seller ? 
                this.EDIT_BUTTON : 
                  this.DEFAULT_BUTTON : 
             this.NO_BUTTON }
             <br/>
             { constants.prettifyNumber(this.state.price) }
        </div>
        <div className="chip">
          { this.props.product.category || 'No Categories'}
        </div>
      </div>
    );
  }
}
                  // {<a className={`btn-floating btn-large waves-effect waves-light green accent-3 right ${this.props.loggedIn && this.state.canBuy ? '' : 'disabled'}`} onClick={this.buy.bind(this)}><i className="material-icons">add_shopping_cart</i></a>}
                  // {this.state.bought ? <div className="chip"><a className="waves-effect waves-light btn-button buyton" href={`https://www.coinbase.com/checkouts/${this.state.embedCode}`}>Pay With Bitcoin</a></div> : ''
export { CardAction, CardReveal, CardTitle, CardImage };