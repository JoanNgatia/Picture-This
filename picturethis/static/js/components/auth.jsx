import { render } from 'react-dom'
import React, {Component} from 'react';

const Auth = () => {
    return (
        <div className="row" id="social_login_div">
          <h1>Picture-This</h1>
          <h3>Make your memories magical</h3>
          <div className="col" id="facebook_login">
            <a className="waves-effect waves-light btn" id="facebook_login_button" href="/"><i className="fa fa-facebook-official"></i> Login With Facebook</a>
          </div>
          <div className="col" id="twitter_login">
            <a className="waves-effect waves-light btn" id="twitter_login_button" href="/"><i className="fa fa-twitter"></i> Login With Twitter</a>
          </div>
        </div>
    );
}

export default Auth