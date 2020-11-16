import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLoggingIn, setRegistering } from '../../../../state/actions/appActions';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../../../graphql/queries';
import { TextField, Icon } from '@shopify/polaris';
import { SearchMinor, CustomersMinor, CartMajor } from '@shopify/polaris-icons';
import SearchProduct from './SearchProduct';
import { logo } from '../../../icons';
import { priced, transformProducts } from '../../../helpers';
import './Subhead.sass';

function Subhead(){
    const dispatch = useDispatch();
    const [ search, setSearch ] = useState("");
    const [ searching, setSearching ] = useState(false);
    const [ focused, setFocused ] = useState(false);
    const [ open, setOpen ] = useState(false);
    const { lineItems, totalPrice } = useSelector(state => state.checkout);
    const quantity = lineItems.edges?.length ?? 0;
    const { data } = useQuery(GET_PRODUCTS, {variables: {first: 5, query: search ? search : ".........."}});

    const products = transformProducts(data?.products?.edges ?? []);

    function onBlur(){
        setTimeout(() => {
            setOpen(false);
            setFocused(false);
            setSearching(false); 
        }, 200);
    }

    return(
        <div className="Subhead">
            <div className="logospace">
                <Link to="/">{logo}</Link>
                <div className="language">
                    <span>EN</span> / <strong className="selected">AL</strong>
                </div>
            </div>
            <div className="utilities">
                <div className={`item textfield ${searching ? "searching" : ""}`}>
                    <TextField focused={focused} value={search} onFocus={() => {setOpen(true);setFocused(true)}} onBlur={onBlur} onChange={s => setSearch(s)} placeholder="Kërko këtu" prefix={<Icon source={SearchMinor} />} />
                    <div className={`searched-products ${open && products.length ? "open" : ""}`}>
                        {products.map((product, i) => <SearchProduct onClick={() => setSearch("")} key={product.id} {...product}  i={i} />)}
                    </div>
                </div>
                <div className="item kontakto">Na kontakto këtu nëse<br /> je artizan shqiptar</div>
                <div className="item hyr">
                    <button onClick={() => dispatch(setLoggingIn(true))}><Icon source={CustomersMinor} /> Hyr</button>
                    <div className="register">apo <strong><span onClick={() => dispatch(setRegistering(true))}>Regjistrohu tani!</span></strong></div>
                </div>
                <div onClick={() => dispatch(setLoggingIn(true))} className="item hyr-icon">
                    <Icon source={CustomersMinor} />
                </div>
                <Link to="/shporta" className="item cart">
                    <div className="cart-icons">
                        <Icon source={CartMajor} />
                        <div className="quantity">{quantity}</div>
                    </div>
                    <div className="words">
                        <div className="shporta">Shporta</div>
                        <div className="cmimi">{priced(totalPrice)}</div>
                    </div>
                </Link>
                <div onClick={() => {setSearching(true);setFocused(true)}} className="item mobile-textfield-icon">
                    <Icon source={SearchMinor} />
                </div>
            </div>
        </div>
    )
}

export default Subhead;