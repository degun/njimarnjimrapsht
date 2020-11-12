import React from 'react';
import { Link } from 'react-router-dom';
import Product from '../../_common/Product';
import { useDispatch } from 'react-redux';
import { setSelectedTags } from '../../../state/actions/productsActions';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../../graphql/queries';
import { more } from '../../icons';
import { transformProducts } from '../../helpers';
import './ByTag.sass';

function ByTag({tag}){
    const dispatch = useDispatch();
    const { data } = useQuery(GET_PRODUCTS, {variables: {first: 12, query: `tag:${tag}`}, fetchPolicy: "cache-and-network"});
    const products = transformProducts(data?.products?.edges ?? [])
 
    return(
        <React.Fragment>
        <div className="products-by-tag">
            {products.map((product, i) => <Product key={product.id} {...product}  i={i} />)}
        </div>
        <Link to="/produkte" className="more" onClick={() => dispatch(setSelectedTags([tag]))}>{more} &nbsp;&nbsp;&nbsp; Më trego më shumë</Link>
        </React.Fragment>
    )
}

export default ByTag;