import React from 'react';
import Head from './Head/Head';
import QuickInfo from './QuickInfo/QuickInfo';
import Vitrine from './Showcase/Showcase';
import { useQuery } from '@apollo/client';
import { GET_COLLECTIONS } from '../../graphql/queries';
import './Home.sass';

function Home() { 
    const { data: collectionsCustom } = useQuery(GET_COLLECTIONS, {variables: {query: "collection_type:custom"}});
    const collections = collectionsCustom?.collections?.edges?.map(({node}) => {
        const {title, handle} = node;
        return {title, handle}
    }) ?? [];
    const { data: collectionsManual } = useQuery(GET_COLLECTIONS, {variables: {query: "collection_type:smart"}});
    const Scollections = collectionsManual?.collections?.edges?.map(({node}) => {
        const {title, handle} = node;
        return {title, handle}
    }) ?? [];

    return(
        <div className="Home">
            <Head collections={collections} />
            <QuickInfo />
            <Vitrine title="Produkte të zgjedhura" collections={Scollections} />
        </div>
    )
 }

export default Home;