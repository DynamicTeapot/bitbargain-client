import React from 'react';
import { Link } from 'react-router';
import item from '../../schema';


// TODO: I can't get the default value for images working.


class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0
    }
  }
  componentDidMount() {
    $('.carousel.carousel-slider').carousel({ full_width: true });
    $(`.left${this.props.product.id}`).on('click', (e) => {
      $(`.carousel${this.props.product.id}`).carousel('prev');
    });
    $(`.right${this.props.product.id}`).on('click', (e) => {
      $(`.carousel${this.props.product.id}`).carousel('next');
    });
  }
  imageClick() {
    var nextIndex = (this.state.imageIndex + 1) % this.props.product.images.length;
    this.setState({imageIndex: nextIndex});
  }
  imageHover(e) {
    if (this.props.product.images.length > 1) {
      $(e.target).animate({ opacity: 0.7 }, 100);
    }
  }
  imageUnhover(e) {
    $(e.target).animate({ opacity: 1 }, 100);
  }
  // Here's a sweet comment
  // We map the items where the a tags are
  render() {
    return (
      <div className="col s3 m3 l3 center">
        <div className="card">
          <Link to={`/product/${this.props.product.id}`}>
            <span className="flow-text truncate"><small>{this.props.product.title}</small></span>
          </Link>
          <div className="card-image valign-wrapper" style={{height:200, overflow:'hidden'}}>
            <img className="responsive-img hoverable valign" onMouseOver={(e)=>{this.imageHover(e)}} onMouseOut={(e)=>{this.imageUnhover(e)}} src={this.props.product.images[this.state.imageIndex]} onClick={this.imageClick.bind(this)}/>
          </div>
          <Link to={`/product/${this.props.product.id}`}>
            <div className="card-action">
              <span className="flow-text truncate"><small>{`$${Number(this.props.product.price).toFixed(2)}`}</small></span>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
      
      {/*<Link className="collection-item" to={`/product/${this.props.product.id}`}>
       <div className="search-result-content">
          <span className="activator grey-text text-darken-4 truncate">
            {this.props.product.title}
          </span>
        </div>
         
        <div className="result-image-container">
          <div className={`carousel carousel-slider search-result-div carousel${this.props.product.id}`} data-indicators="true">
            <div className="carousel-fixed-item center">
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
            {this.props.product.category || 'No Categories'}
          </div>
          </Link>*/}


SearchResult.propTypes = {
  product: item
};


export default SearchResult;
