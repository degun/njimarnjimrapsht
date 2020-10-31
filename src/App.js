import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Shop from './components/Shop/Shop';
import { SHOP } from './graphql/queries';
import { useQuery } from '@apollo/client';
import './App.sass';

function App() {

  const {data, loading, error} = useQuery(SHOP);

  console.log({data, loading, error});

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/shop" component={Shop} />
      </Switch>
    </div>
  );
}

export default App;
