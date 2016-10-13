import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import rates from 'bitcoin-exchange-rates';

import { ImageUpload, ImagePreview } from './ImageUpload.jsx';
import item from '../../schema';
import { mapStateToProps, mapDispatchToProps } from '../../reducers/sellitem.reducer';
import Mock from './Preview.jsx';

class sellItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      price: '',
      submitted: false,
      categories: []
    };
  }
  handleForm(e) {
    // /items/sell endpoint
    if(this.state.title && this.state.description && this.state.price) {
      const newItem = this.state;
      delete newItem.submitted;
      newItem.category = JSON.stringify(this.state.categories);
      newItem.created_at = new Date();
      newItem.updated_at = new Date();
      // join local state w/ redux images
      newItem.images = this.props.images;
      this.props.submitSell(newItem);
    }
  }
  addCategory(e) {
    e.preventDefault();
    this.setState({categories: this.state.categories.concat(e.target.value)});
  }
  categorize() {
    // if (this.state.title && this.state.description && !this.state.submitted) {
    //   this.setState({submitted: true});
    //   fetch(`/api/categories/predict`, {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({text: this.state.title + ' ' + this.state.description})
    //   })
    //   .then(resp => resp.text())
    //   .then(raw => {
    //     this.setState({categories: this.state.categories.concat(raw)});
    //   });

    // this.props.getCategories(this.state.title.valueOf() + ' ' + this.state.description.valueOf());
    // }
  }
  mock() {
    return {
      images: this.props.images,
      category: this.state.categories,
      title: this.state.title,
      price: this.state.price,
      description: this.state.description,
      created_at: new Date(),
      updated_at: new Date(),
      location: null,
      id: null
    }
  }
  openMock() {
    $('#mock').openModal({
      in_duration: 0, // Transition in duration
      out_duration: 0,
      opacity: 0
    });
  }
  render() {
    const submitFun = (e) => { e.preventDefault(); this.handleForm(e); return false; };
    const priceFun = e => this.setState({ price: e.target.value });
    const descFun = e => this.setState({ description: e.target.value });
    const titleFun = e => this.setState({ title: e.target.value });
    const catFun = e => {
      if (e.which === 13) {
        this.setState({ categories: this.state.categories.concat(e.target.value)});
        $(e.target).val('');
      }
      return false;
    };
    const removeFun = e => {
      let text = $($(e.target).parent()[0]).text();
      var removeIndex = this.state.categories.findIndex(cat => {
        return cat === text;
      });
      var rmCats = this.state.categories.slice(0, removeIndex).concat(this.state.categories.slice(removeIndex+1));
      this.setState({categories: rmCats});
    }
    return ((
        <div className="container">
          <div className="row">
            {/*<form id="sell-form" className="sell-item-form col s12">*/}
            <div className="col s6 push-s6">
              <ImagePreview />
              <ImageUpload />
              <div className="row">
                <div className="input-field col s6">
                  <input onChange={titleFun} className="active" type="text" id="title" onBlur={this.categorize.bind(this)}/>
                  <label htmlFor="title">Product Name</label>
                </div>

                  <div className="input-field col s6">
                    <input onChange={priceFun} type="number" className="validate" id="price" min="0.00" step='0.01' />
                    <label htmlFor="price">Price($)</label>
                  </div>
                </div>


                <div className="row">
                  <div className="input-field col s12">
                    <textarea className="materialize-textarea" onChange={descFun} id="description" onBlur={this.categorize.bind(this)}/>
                    <label className="active" htmlFor="description">Description</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s4">
                    <input className="active" type="text" id="category icon_prefix" onKeyDown={catFun}/>
                    <label htmlFor="category">Categories</label>
                  </div>
                  {this.state.categories.map((category,index) => {
                    return (<a onClick={removeFun} key={index}><div className="chip cats">{category}</div></a>)
                  })}
                </div>

                  <button className="btn waves-effect waves-light" type="submit" name="action" onClick={submitFun}>Submit
                    <i className="material-icons right">send</i>
                  </button>
              {/*</form>*/}
              </div>
              <div className="col s6 pull-s6">
                <Mock product={this.mock()}/>
              </div>
            </div>
          </div>
  ));
  }
}

sellItemContainer.propTypes = {
  status: PropTypes.string.isRequired,
  submitSell: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired
};

const SellItem = connect(mapStateToProps, mapDispatchToProps)(sellItemContainer);

export default SellItem;
