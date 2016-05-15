import { render } from 'react-dom'
import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import OriginalPhotoList from './originalphotos.jsx';
import EditedPhotoList from './editedphotos.jsx';
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
            <div className="col s12 m4 l4">
              <ul className="tabs">
                <li className="tab col s6 active "><a href="#">Home</a></li>
                <li className="tab col s6"><a href="#">Profile</a></li>
              </ul>
              <form action="/api/photos/" method="post">
                <div className="file-field input-field">
                  <div className="btn">
                    <span>Add new Photo</span>
                    <input type="file" />
                  </div>
                  <div class="file-path-wrapper">
                    <input class="file-path validate" type="text" />
                  </div>
                </div>
              </form>
              <OriginalPhotoList />
            </div>
            <div className="col s12 m8 l8">
            </div>
          </div>
        </div>
      );
}

export default Home
