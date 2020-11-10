import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../../../graphql/queries';
import { TextField, Icon } from '@shopify/polaris';
import { SearchMinor, CustomersMinor, CartMajor } from '@shopify/polaris-icons';
import SearchProduct from './SearchProduct';
import { logo } from '../../../icons';
import { priced } from '../../../helpers';
import './Subhead.sass';

function Subhead(){
    const [ search, setSearch ] = useState("");
    const [ open, setOpen ] = useState(false);
    const { lineItems, totalPrice } = useSelector(state => state.checkout);
    const quantity = lineItems.edges?.length ?? 0;
    const { data } = useQuery(GET_PRODUCTS, {variables: {first: 10, query: search ? search : ".........."}});

    const products = data?.products?.edges?.map(({node, cursor}) => {
        const {id, title, handle, priceRange, compareAtPriceRange, images} = node;
        return {
            id, 
            title,
            handle,
            price: priceRange.minVariantPrice.amount,
            compareAtPrice: compareAtPriceRange?.minVariantPrice?.amount,
            image: images.edges[0].node.transformedSrc,
            cursor
        }
    }) ?? [];

    function onBlur(){
        setTimeout(() => {
            setOpen(false)
        }, 300);
    }

    return(
        <div className="Subhead">
            <div className="logospace">
                <Link to="/">{logo}</Link>
                <div className="language">
                    <span>EN</span>/<strong className="selected">AL</strong>
                </div>
            </div>
            <div className="utilities">
                <div className="item">
                    <TextField value={search} onFocus={() => setOpen(true)} onBlur={onBlur} onChange={s => setSearch(s)} placeholder="Kërko këtu" prefix={<Icon source={SearchMinor} />} />
                    <div className={`searched-products ${open && products.length ? "open" : ""}`}>
                        {products.map((product, i) => <SearchProduct onClick={() => setSearch("")} key={product.id} {...product}  i={i} />)}
                    </div>
                </div>
                <div className="item">
                    <div className="kontakto">Na kontakto këtu nëse<br /> je artizan shqiptar</div>
                </div>
                <div className="item">
                    <div className="hyr">
                        <button><Icon source={CustomersMinor} /> Hyr</button>
                        <div className="register">apo <strong><a href="/">Regjistrohu tani!</a></strong></div>
                    </div>
                    
                </div>
                <div className="item">
                    <Link to="/shporta" className="cart">
                        <div className="cart-icons">
                            <Icon source={CartMajor} />
                            <div className="quantity">{quantity}</div>
                        </div>
                        <div className="words">
                            <div className="shporta">Shporta</div>
                            <div className="cmimi">{priced(totalPrice)}</div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Subhead;