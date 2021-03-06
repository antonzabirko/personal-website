import React from 'react';
import { connect } from 'react-redux';

export const LoginPage = ({ startLogin }) => (
  <div className="box-layout">
      <div className="box-layout__box">
          <h1 className="box-layout__title">Boilerplate</h1>
          <p>tagline for app</p>
          <button onClick={startLogin} className="button">Login with Google</button>
      </div>
  </div>
);
/*<input type="text" placeholder="username"/>
  <input type="text" placeholder="password"/>*/

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
