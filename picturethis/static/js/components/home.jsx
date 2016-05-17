import { render } from 'react-dom'
import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import OriginalPhotoList from './originalphotos.jsx';
import EditedPhotoList from './editedphotos.jsx';
import ImagePanel from './imagepanel.jsx';
injectTapEventPlugin();

const Home = () => {

      return (
        <div>
          <nav>
            <div className="nav-wrapper">
              <a href="#!" className="brand-logo">Picture-This</a>
              <ul className="right hide-on-med-and-down">
                <li><a href="/logout">Log-Out <i className="fa fa-sign-out" aria-hidden="true"></i></a></li>
              </ul>
            </div>
          </nav>
          <div className="row">
            <div className="col s12 m4 l3">
              <ul className="tabs">
                <li className="tab col s6 active "><a href="#">Home</a></li>
                <li className="tab col s6"><a href="#">Profile</a></li>
              </ul>
              <OriginalPhotoList />
            </div>
            <div className="col s12 m8 l9">
                <div className="col s12 thumbnails">
                  <ImagePanel />
                </div>
            </div>
          </div>
        </div>
      );
}

module.exports = Home
