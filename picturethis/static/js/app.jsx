// import React, {Component} from 'react';
// import { render } from 'react-dom'
// import Home from './components/home.jsx';

// class App1 extends React.Component {
//   render() {
//     return (
//         <div>
//             <Home />
//         </div>
//     );
//   }
// }

// render(<App1/>, document.getElementById('home'))
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory, IndexRoute} from 'react-router';
import React, {Component} from 'react';
import Home from './components/home.jsx';
import Auth from './components/auth.jsx';

let routes = (<Router history={browserHistory}>
                <Route path="/" component={Auth}/>
                <Route path="/home" component={Home}/>
              </Router>)

render(routes, document.getElementById('home'));
