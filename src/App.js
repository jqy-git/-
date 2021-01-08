import { Switch, Route, Redirect } from 'react-router-dom'
import MyLayOut from './components/myLayout';
import { layoutRoute } from './routes/routers'
import { isLogined } from './utils/auth'

function App() {
  return isLogined() ?
   ( <div className="App">
      <Switch>
      <Route path="/main" render={routeProps => <MyLayOut {...routeProps} />} />
        {layoutRoute.map(route => {
          return <Route key={route.path} path={route.path} exact
            render={routeProps => <route.component {...routeProps} />} ></Route>
        })}
        <Redirect to='/404' />
      </Switch>
    </div>
   ) : (
    <Redirect to='/login' />
  );
}

export default App;
