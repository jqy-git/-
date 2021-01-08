import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { loginRoute } from './routes/routers'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/main" render={routeProps => <App {...routeProps} />} />
        {loginRoute.map(route => <Route key={route.path} {...route} />)}
        <Redirect to='/login' from='/' />
        <Redirect to='/404' />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
