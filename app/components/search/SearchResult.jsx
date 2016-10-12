import React from 'react';
import { Link } from 'react-router';
import item from '../../schema';


// TODO: I can't get the default value for images working.


class SearchResult extends React.Component {
  componentDidMount() {
    $('.carousel.carousel-slider').carousel({ full_width: true });
    $(`.left${this.props.product.id}`).on('click', (e) => {
      $(`.carousel${this.props.product.id}`).carousel('prev');
    });
    $(`.right${this.props.product.id}`).on('click', (e) => {
      $(`.carousel${this.props.product.id}`).carousel('next');
    });
  }
  // Here's a sweet comment
  // We map the items where the a tags are
  render() {
    return (
      <div className="col s12 m4 l3 sticky-action result-card">
      <Link className="collection-item" to={`/product/${this.props.product.id}`}>
       <div className="search-result-content">
          <span className="activator grey-text text-darken-4 truncate">
            {this.props.product.title}
          </span>
        </div>
         
        <div className="result-image-container">
          <div className={`carousel carousel-slider search-result-div carousel${this.props.product.id}`} data-indicators="true">
            <div className="carousel-fixed-item center">
              <a className={`left${this.props.product.id}`}><i className="material-icons left">keyboard_arrow_left</i></a>
              <a className={`right${this.props.product.id}`}><i className="material-icons right">keyboard_arrow_right</i></a>
          j </div>
            {this.props.product.images.map((url) => (<a className="carousel-item">
            <img
              role="presentation"
              className="activator search-result-image"
              src={url}
            />
            </a>))}
         </div>
        </div>
         <div className="chip">
            Category
          </div>
          </Link>
        </div>
    );
  }
}


SearchResult.propTypes = {
  product: item
};


export default SearchResult;
