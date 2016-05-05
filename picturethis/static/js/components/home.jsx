import { render } from 'react-dom'
import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';

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
                <h6>Hello World!!</h6>
            </div>
        );
    }
}

module.exports = Home;