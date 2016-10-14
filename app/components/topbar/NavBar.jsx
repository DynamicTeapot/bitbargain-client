import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

function mapStateToProps(state) {
  return {
    user: state.login.user
  };
}

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabMap: []
    };
  }
  componentDidMount() {
    // $('.button-collapse').sideNav();
    this.updateTabs(this.props);
    $('#realNav').pushpin({ top: $('nav').offset().top});
  }
  componentWillReceiveProps(newProps) {
    this.updateTabs(newProps);
  }
  updateTabs(newProps) {
    const home = {
      title: 'Home',
      link: '',
      align: 'left'
    };
    const coin = {
      title: 'coin',
      link: 'special',
      align: 'right',
      data: <li
        key="coin"
        className="right"
      >
        <a
          href="/auth/login/coinbase"
        >
          <i className="material-icons">
             monetization_on
          </i>
        </a>
      </li>
    };

    const sell = {
      title: 'Sell',
      link: '/sellitem',
      align: 'left'
    };

    const signup = {
      title: 'Sign Up',
      link: '/signup',
      align: 'right'
    };

    const login = {
      title: 'Login',
      link: '/login',
      align: 'right'
    };

    const signout = {
      title: 'Signout',
      link: 'special',
      align: 'right',
      data: <li
        key="signout"
        className="right"
      >
        <a href="/auth/logout">
          <i className="material-icons">
        exit_to_app
          </i>
        </a>
      </li>
    };

    const tabMap = [home, sell, coin];

    if (newProps.user !== 'Anonymous') {
      this.setState({
        tabMap: tabMap.concat(signout)
      });
    } else {
      this.setState({
        tabMap: tabMap.concat([signup, login])
      });
    }
  }

  render() {
    const tabsLeft = this.state.tabMap.map(
      (tab, index) => {
        if (tab.align === 'left') {
          return (
            <li key={index} className={tab.align}>
              <Link to={tab.link}>
                {tab.title}
              </Link>
            </li>
         );
        }
        return '';
      }
    );

    const tabsRight = this.state.tabMap.map((tab, index) => {
      if (tab.align === 'right') {
        if (tab.link === 'special') {
          return tab.data;
        }
        return (
          <li
            key={index}
            className={tab.align}
          >
            <Link to={tab.link}>
              {tab.title}
            </Link>
          </li>
        );
      }
      return '';
    });

    const mobile = this.state.tabMap.map((tab, index) => {
      if(tab.link === 'special') {
        // return tab.data;
      }
      return (<li key={index}>
        <Link to={tab.link}>
          {tab.title}
        </Link>
      </li>)
    });

    return (
      <div>
        <nav style={{display:'hidden'}}></nav>
        <nav style={{zIndex: 1}} id='realNav'>
          <div className="nav-wrapper cyan">
            <a data-activates="mobile" className="button-collapse">
              <i className="material-icons">menu</i>
            </a>
            <a className="brand-logo center">
              {this.props.user !== 'Anonymous' ? this.props.user : 'Bit Bargain'}</a>
            <ul className="left hide-on-med-and-down">
              {tabsLeft}
            </ul>
            <ul className="right hide-on-med-and-down">
              {tabsRight}
            </ul>
            <ul className="side-nav" id="mobile" style={{zIndex:10001}}>
              {mobile}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

NavBar.propTypes = {
  user: PropTypes.string.isRequired
};


export default connect(mapStateToProps, null)(NavBar);
