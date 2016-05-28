import { render } from 'react-dom'
import React, {Component} from 'react';
import OriginalPhotoList from './originalphotos.jsx';
import ImagePanel from './imagepanel.jsx';

class Home extends React.Component {
  render(){
      return (
        <div>
          <div className="row">
            <div className="col s12 m4 l3">
              <ul className="tabs">
                <li className="tab select col s6 active "><a href="#">Originals</a></li>
                <li className="tab select col s6"><a href="#">Edits</a></li>
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
}

export default Home
