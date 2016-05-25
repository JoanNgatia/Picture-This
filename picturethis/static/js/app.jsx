import React, {Component} from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, hashHistory, IndexRoute} from 'react-router';
import Home from './components/home.jsx';

// const userLoggedIn = (nextState, replaceState) => {
//     let currentUser = LoginUtitilty.getUser();
//     //save it in a cookie
//    if(!currentUser){
//     replaceState({ nextPathname: nextState.location.pathname }, '/')   }
// }
// <Route path="/dashboard" component={dashboard} onEnter={userLoggedIn}  initData={userData}/>

// let routes = (<Router history={browserHistory}>
//                 <Route path="/home" component={Home}/>
//               </Router>)

// render(routes, document.getElementById('home'));

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
