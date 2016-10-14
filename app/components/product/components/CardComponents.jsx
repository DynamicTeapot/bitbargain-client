import React from 'react';
import { Link } from 'react-router';

import constants from '../ProductEnums.js';

const DEFAULT_WIDTH = constants.DEFAULT_WIDTH;
const DEFAULT_BUTTON = (props) => (
  <Link to={`/payment/${props.id}`} className='waves-effect waves-light btn-floating'>
    <i className="material-icons">add_shopping_cart</i>
  </Link>
);
const NO_BUTTON = (props) => (
  <div>
    <a className='waves-effect waves-light btn-floating btn-button tooltipped disabled' data-position="top" data-delay="50" data-tooltip="Please log in to purchase">
      <i className="material-icons">add_shopping_cart</i>
    </a>
  </div>
);
const CANCEL_BUTTON = (props) => (
  <a className={`btn-floating waves-effect waves-light green accent-3 right`} onClick={() => console.log('canceled')}>
    <i className="material-icons">cancel</i>
  </a>
);

const chooseButton = (props) => {
  if(!props.loggedIn) {
    return NO_BUTTON(props);
  }
  if (props.user === constants.buyer) {
    return CANCEL_BUTTON(props);
  } else if (props.user === constants.seller) {
    return EDIT_BUTTON(props);
  }
  return DEFAULT_BUTTON(props);
}

const colors = ['light', 'red', 'yellow', 'teal', 'purple', 'orange', 'green', 'blue']

const CardTitle = props => {
  return (
  <div className="card-content">
    <span className="card-title grey-text text-darken-4 activator truncated flow-text center">
      { props.product.title }
    </span>
    <span className="right" style={{zIndex:1}}>
      {constants.prettifyNumber(props.product.price)}&#9;&nbsp;&nbsp;&nbsp;
      {chooseButton(props, false)}
    </span>
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
  setImgIndex(index) {
    this.setState({imageIndex: index});
  }
  render() {
    return this.state.fullsize ?
      (<div className="card-image waves-effect waves-block waves-light valign-wrapper" style={{overflow:'hidden'}}>
        <img className="responsive-img hoverable valign"
             onClick={()=>{this.setState({fullsize: false})}}
             src={this.props.product.images[this.state.imageIndex]}/>
      </div>)
      :
      (<div className="card-image valign-wrapper">
        <div className={`col ${this.props.product.images.length > 1 ? 's6 push-s6' : 's12'}`}>
          <center>
              <a onClick={()=>{this.setState({fullsize: true})}}>
                <img src={this.props.product.images[this.state.imageIndex]}
                     style={{maxWidth:'100%', maxHeight:'300px', minHeight:'300px', height:'auto', width:'auto', padding:'1px', border:'1px solid #b0bec5'}}/>
               </a>
           </center>
        </div>
      <div className={this.props.product.images.length > 1 ? 'col s6 pull-s6' : 'hide'} style={{height:300}}>
          {this.props.product.images.length > 1 ?
             this.props.product.images.map((imgSrc, index, imgs) => {
              return (
                <a className={`waves-effect waves-${colors[Math.floor(Math.random()*colors.length)]}`} onClick={()=>{this.setImgIndex(index)}}>
                  <div className="card">
                    <img key={index}
                         src={imgSrc} 
                         className="z-depth-2"
                         style={{height:`${100/imgs.length}%`, width:'auto', margin:5, float:'right', padding:'1px', border:'1px solid #b0bec5'}}/>
                  </div>
                </a>
                )
            })
          :
          <p></p>
        }
        </div>
      </div>)
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
      price: this.props.product.price,
      id: this.props.product.id,
      categories: constants.ensureArray(this.props.product.category)
    };
  }
  componentDidMount() {
    $('.tooltipped').tooltip({delay: 10});
  }
  componentWillReceiveProps(nextProps) {
    this.setState({price: nextProps.product.price, id: nextProps.product.id, categories: constants.ensureArray(this.props.product.category)});
    console.log(this.state.categories);
  }
  render() {
    return (
      <div className="card-action">
        <p className="flow-text">
          {this.props.product.description}
        </p>
        <div className="right-align">
          {/* chooseButton(this.props, true) */}
          <br/>
          {/* constants.prettifyNumber(this.state.price) */}
        </div>
          { (this.state.categories.length > 0 && this.state.categories[0] !== '') ?
              this.state.categories.map((cat, index) => {
                return (<div className="chip" key={index}>{cat}</div>)
              })
            :
            (<div className="chip">No Categories</div>)
          }
      </div>
    );
  }
}
                  // {<a className={`btn-floating btn-large waves-effect waves-light green accent-3 right ${this.props.loggedIn && this.state.canBuy ? '' : 'disabled'}`} onClick={this.buy.bind(this)}><i className="material-icons">add_shopping_cart</i></a>}
                  // {this.state.bought ? <div className="chip"><a className="waves-effect waves-light btn-button buyton" href={`https://www.coinbase.com/checkouts/${this.state.embedCode}`}>Pay With Bitcoin</a></div> : ''
export { CardAction, CardReveal, CardTitle, CardImage };