import { render } from 'react-dom'
import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import PhotoList from './photos.jsx';
injectTapEventPlugin();

class Home extends Component {
  render () {
      return (
          <div>
                <nav>
                  <div className="nav-wrapper">
                    <a href="#" className="brand-logo">Picture-This</a>
                    <ul className="right hide-on-med-and-down">
                      <li><a href="#"><i className="material-icons">search</i></a></li>
                      <li><a href="#"><i className="material-icons">refresh</i></a></li>
                      <li><a href="#"><i className="material-icons">more_vert</i></a></li>
                    </ul>
                  </div>
                </nav>
              <div className="row">
                  <div className="col s12 m4 l3">
                      <div id="editedphotos">
                      </div>
                  </div>
                  <div className="col s12 m8 l9">
                      <div id="originalphotos">
                        <h1>Hello there!!!</h1>
                        <h4>That's all there is for now</h4>
                        <PhotoList />
                      </div>
                  </div>
              </div>
          </div>
      );
  }
}

module.exports = Home;
