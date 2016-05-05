import React, {Component} from 'react';
import { render } from 'react-dom'
import Home from './components/home.jsx';

class App1 extends React.Component {
  render() {
    return (
        <div>
            <Home />
        </div>
    );
  }
}

render(<App1/>, document.getElementById('home'))