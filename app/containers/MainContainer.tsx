import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import GraphsContainer from './Archived';
import Home from '../components/Home';
import About from '../components/About';
import Contact from '../components/Contact';
import Settings from '../components/Settings';
import Occupied from '../components/Occupied';
// import Occupied from '../components/Occupied_darkmode';
import GraphsContainer from './GraphsContainer';
import '../stylesheets/MainContainer.scss';
// import '../stylesheets/MainContainer_darkmode.scss';

import ApplicationContextProvider from '../context/ApplicationContext';

const MainContainer = React.memo(() => {
  
  return (
  <div className="main-container">
    <div className="main-routes">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/applications" component={Occupied} />
        <Route exact path="/applications/:app/:service" component={GraphsContainer} />
        <Route path="*" render={() => <h1>Not found</h1>} />
      </Switch>
    </div>
  </div>
)});

export default MainContainer;
