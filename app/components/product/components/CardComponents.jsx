import React from 'react';
import enums from '../ProductEnums.js';
const DEFAULT_WIDTH = '80%';

const CardTitle = props => {
  return (
  <div className="card-content">
    <center><span className="card-title grey-text text-darken-4 activator">
      { props.product.title }
    </span></center>
  </div>
  );
};

const CardImage = props => {
  return (
    <div className="card-image waves-effect waves-block waves-light">
      <center>
        <div className="carousel carousel-slider">
          <div className="carousel-fixed-item center">
          </div>
          { props.product.images.map((url, index) => (
            <div className="carousel-item" key={index}>
              <img src={url} role="presentation" className="activator" style={{ width: DEFAULT_WIDTH }} />
            </div>
          ))}
        </div>
      </center>
    </div>
  );
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

const CardAction = props => (
    <div className="card-action">
      <div className="right-align">
        <a className={`btn-floating btn-large waves-effect waves-light green accent-3 right ${props.loggedIn ? '' : 'disabled'}`} onClick={() => console.log('canceled')}><i className="material-icons">cancel</i></a>
      </div>
      <div className="chip">
        { props.product.category }
      </div>
      <small>
        <div><center><h4>{ props.product.price }</h4><br /></center></div>
      </small>
    </div>
);

export { CardAction, CardReveal, CardTitle, CardImage };