import React from 'react';
import { Switch, Route } from 'react-router';
import App from '../containers/App';
import Home from '../containers/Home';
import About from '../containers/About';
import Result from '../containers/Result.jsx';
import NotFound from '../containers/NotFound';
import { getHomeData } from '../redux/actions/home';
import { getAboutData } from '../redux/actions/about';

// for more details see https://reacttraining.com/react-router/web/guides/server-rendering
// specify routes with the asnyc function required to fetch the data to render the route
// IMPORTANT: the loadData function must return a Promise
export const routes = [{
  path: '/',
  exact: true,
  component: Home,
  loadData: () => getHomeData()
}, {
  path: '/about',
  exact: true,
  component: About,
  loadData: () => getAboutData()
}, {
    path: '/result',
    exact: true,
    component: Result
}, {
  component: NotFound
}];

export default function Router() {

    return (
    <App>
      <Switch>
        {routes.map(route => (
          <Route key={route.path || 'notfound'} {...route} />
        ))}
      </Switch>
    </App>
  );
}
