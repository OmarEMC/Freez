import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { HomePage, Dashboard, Docs } from './pages'
import { Header } from './components';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/docs" component={Docs}/>
        <Route path="*" component={HomePage}/>
      </Switch>
    </>
  );
}

export default App;
