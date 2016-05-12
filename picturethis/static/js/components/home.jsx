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
                      <div className="row">
                        <div className="col s12">
                          <ul className="tabs">
                            <li className="tab col s6"><a href="#originalphotos">Your Photos</a></li>
                            <li className="tab col s6"><a className="active" href="#test2">Edits</a></li>
                          </ul>
                        </div>
                      </div>
                  </div>
                  <div className="col s12 m8 l9">
                      <div id="originalphotos">
                        <h1>Hello there!!!</h1>
                        <h4>That's all there is for now</h4>
                        <OriginalPhotoList />
                      </div>
                  </div>
              </div>
          </div>
      );
}

export default Home
