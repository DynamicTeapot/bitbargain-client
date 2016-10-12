import { connect } from 'react-redux';
import React, { PropTypes } from 'react';

import NavBar from '../components/topbar/NavBar.jsx';
import Footer from '../components/topbar/Footer.jsx';
import Chime from '../components/topbar/Chime.jsx';
import { mapDispatchToProps } from '../reducers/auth.reducer';

class AppContainer extends React.Component {
  componentWillMount() {
    fetch('/auth/persist', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(data => data.text())
    .then((resp) => {
      if (resp !== '') {
        try {
          this.props.loginSuccess(JSON.parse(resp));
        } catch (err) {
          this.props.loginSuccess(resp);
        }
      }
    });
  }
  render() {
    return (
      <div>
        <div style={{ minHeight: `${89.2}%`, flex: '1 0 auto' }}>
          <NavBar />
          <Chime />
          {
          React.cloneElement(this.props.children)
          }
        </div>
        <Footer />
      </div>
    );
  }
}

AppContainer.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired
};

const App = connect(null, mapDispatchToProps)(AppContainer);


export { App, AppContainer };
