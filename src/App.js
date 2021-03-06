import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import SingleProduct from './components/SingleProduct/SingleProduct';
import Cart from './components/Cart/Cart';
import About from './components/About/About';
import Blog from './components/Blog/Blog';
import Container from './components/_common/Container';
import Register from './components/_common/Auth/Register';
import Login from './components/_common/Auth/Login';
import { GET_CUSTOM_COLLECTIONS, GET_SMART_COLLECTIONS, GET_TAGS, GET_TYPES } from './graphql/queries';
import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { setCustomCategories, setSmartCategories, setTags, setTypes } from './state/actions/appActions';
import './App.sass';

function App() {

  const dispatch = useDispatch();

  const {data: customCollectionsData, loading: customCollectionsLoading} = useQuery(GET_CUSTOM_COLLECTIONS);
  const {data: smartCollectionsData, loading: smartCollectionsLoading} = useQuery(GET_SMART_COLLECTIONS);
  const {data: tags, loading: tagsLoading} = useQuery(GET_TAGS);
  const {data: types, loading: typesLoading} = useQuery(GET_TYPES);

  if(!customCollectionsLoading)dispatch(setCustomCategories(customCollectionsData?.collections?.edges?.map(({node}) => {return {...node}}) ?? []));
  if(!smartCollectionsLoading)dispatch(setSmartCategories(smartCollectionsData?.collections?.edges?.map(({node}) => {return {...node, image: node.image?.transformedSrc ?? ""}}) ?? []));
  if(!tagsLoading)dispatch(setTags(tags?.productTags?.edges?.map(({node}) => node)));
  if(!typesLoading)dispatch(setTypes(types?.productTypes?.edges?.map(({node}) => node)));

  return (
    <div className="App">
      <Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/produkte" component={Products} />
          <Route exact path="/produkte/:handle" component={SingleProduct} />
          <Route exact path="/shporta" component={Cart} />
          <Route exact path="/rrethnesh" component={About} />
          <Route exact path="/blog" component={Blog} />
        </Switch>
      </Container>
      <Register />
      <Login />
    </div>
  );
}

export default App;
