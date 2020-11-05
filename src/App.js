import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Shop from './components/Shop/Shop';
import SingleProduct from './components/Shop/SingleProduct';
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
  if(!typesLoading)dispatch(setTypes(types?.productTypes?.edges?.map(({node}) => node)))

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/produkte" component={Shop} />
        <Route exact path="/produkte/:handle" component={SingleProduct} />
      </Switch>
    </div>
  );
}

export default App;
