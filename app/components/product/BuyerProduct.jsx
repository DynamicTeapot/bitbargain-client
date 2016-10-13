import React from 'react';
import item from '../../schema';

const DEFAULT_WIDTH = '80%';

const BuyerProduct = props => (
  <div className="container">
    <div className="row">
      <div className="col s12 m10 l10">
        <div className="card sticky-action">
          <div className="card-image waves-effect waves-block waves-light">
            <center>
              <div className="carousel carousel-slider">
                <div className="carousel-fixed-item center">
                  <a className={'leftarrow'}><i className="material-icons large left">keyboard_arrow_left</i></a>
                  <a className={'rightarrow'}><i className="material-icons large right">keyboard_arrow_right</i></a>
                </div>
                {props.product.images.map(url => (
                  <div className="carousel-item">
                    <img src={url} role="presentation" className="activator" style={{ width: DEFAULT_WIDTH }} />
                  </div>
                ))}
              </div>
            </center>
          </div>
          <div className="card-content">
            <center><span className="card-title grey-text text-darken-4 activator">
              { props.product.title }
            </span></center>
          </div>
          <cardBottom/>
        </div>
      </div>
    </div>
  </div>
);

BuyerProduct.propTypes = {
  product: item
};

export default BuyerProduct;
