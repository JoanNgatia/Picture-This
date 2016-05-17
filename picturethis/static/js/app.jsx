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
import { Router, Route, Link, browserHistory, hashHistory, IndexRoute} from 'react-router';
import React, {Component} from 'react';
// import LoginUtitilty form './utils';
import Home from './components/home.jsx';
// import Auth from './components/auth.jsx';


// const userLoggedIn = (nextState, replaceState) => {
//     let currentUser = LoginUtitilty.getUser();
//     //save it in a cookie
//    if(!currentUser){
//     replaceState({ nextPathname: nextState.location.pathname }, '/')   }
// }
// <Route path="/dashboard" component={dashboard} onEnter={userLoggedIn}  initData={userData}/>

let routes = (<Router history={hashHistory}>
                <Route path="/" component={Home}/>
              </Router>)

render(routes, document.getElementById('home'));
