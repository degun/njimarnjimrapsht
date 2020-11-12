import React, { useState, useEffect } from 'react';
import Product from '../_common/Product';
import { Checkbox, Select } from '@shopify/polaris';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory, setSelectedTags } from '../../state/actions/productsActions';
import { setMenuOpen } from '../../state/actions/appActions';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS, GET_COLLECTION_PRODUCTS } from '../../graphql/queries';
import { bullet_arrow } from '../icons';
import { transformProducts } from '../helpers';
import './Products.sass';

function Products(){
    const dispatch = useDispatch();
    const [ cursors, setCursors ] = useState([]);
    const { customCategories, smartCategories, tags, recentlyViewed } = useSelector(state => state.app);
    const { selectedCategory, selectedTags } = useSelector(state => state.products);
    const { handle, title } = selectedCategory;
    const { data: gotProducts, loading: productsLoading } = useQuery(GET_PRODUCTS, {variables: {first: 16, after: cursors[0], query: selectedTags.length ? `tag:${selectedTags.join(" OR ")}` : undefined}});
    const { data: gotCollectionProducts, loading: collectionProductsLoading } = useQuery(GET_COLLECTION_PRODUCTS, {variables: {first: 16, after: cursors[0], handle}});
    const [ expandedCollections, setExpandedCollections ] = useState(true);
    const [ expandedTags, setExpandedTags ] = useState(true);

    const products = transformProducts(gotProducts?.products?.edges ?? []);

    const collectionProducts = transformProducts(gotCollectionProducts?.collectionByHandle?.products?.edges ?? []);

    const recentlyViewedProducts = recentlyViewed?.map(({ id, title, handle, images, variants }) => {
        const price = variants.edges[0]?.node?.priceV2?.amount ?? 0;
        const compareAtPrice = variants.edges[0]?.node?.compareAtPriceV2?.amount ?? 0;
        return {
            id, 
            title,
            handle,
            price,
            compareAtPrice,
            image: images.edges[0].node.transformedSrc
        }
    }) ?? [];

    const productsToShow = selectedCategory.handle ? collectionProducts : products;
    const hasNextPage = selectedCategory.handle ? gotCollectionProducts?.collectionByHandle?.products?.pageInfo?.hasNextPage : gotProducts?.products?.pageInfo?.hasNextPage
    const hasPreviousPage = selectedCategory.handle ? gotCollectionProducts?.collectionByHandle?.products?.pageInfo?.hasPreviousPage : gotProducts?.products?.pageInfo?.hasPreviousPage
    const loading = selectedCategory.handle ? collectionProductsLoading : productsLoading;

    useEffect(() => {
        window.scrollTo(0,0)
        dispatch(setMenuOpen(false));
    }, [handle])

    function goForward(){
        if(hasNextPage){
            let c = Array.from(cursors);
            c.unshift(productsToShow[productsToShow.length - 1].cursor);
            setCursors(c);
        }
    }

    function goBack(){
        if(hasPreviousPage){
            let c = Array.from(cursors);
            c.shift();
            setCursors(c);
        }
    }

    return (
        <section className="Products">
            <div className="head">{title || "Të gjitha"}</div>
            <div className="shop">
                <aside>
                    <div className={`title ${expandedCollections ? "expanded" : ""}`} onClick={() => setExpandedCollections(!expandedCollections)}>
                        {bullet_arrow} <h2>Kategoritë</h2>
                    </div>
                    <ul className={`parameters ${expandedCollections ? "expanded" : ""}`}>
                        <li className={selectedCategory.handle === "" ? "selected" : ""} onClick={() => {dispatch(setSelectedCategory({handle: "", title: "Të gjitha"})); dispatch(setSelectedTags([]))}} key={"te-gjita"}>Të gjitha</li>
                        {smartCategories.map(({handle, title}) => <li className={handle === selectedCategory.handle ? "selected" : ""} onClick={() => {dispatch(setSelectedCategory({handle, title})); dispatch(setSelectedTags([]))}} key={handle}>{title}</li>)}
                        {customCategories.map(({handle, title}) => <li className={handle === selectedCategory.handle ? "selected" : ""} onClick={() => {dispatch(setSelectedCategory({handle, title})); dispatch(setSelectedTags([]))}} key={handle}>{title}</li>)}
                    </ul>
                    <div className={`title ${expandedTags ? "expanded" : ""}`} onClick={() => setExpandedTags(!expandedTags)}>
                        {bullet_arrow} <h2>Etiketat</h2>
                    </div>
                    <ul className={`parameters ${expandedTags ? "expanded" : ""}`}>
                        {tags.map(tag => <li className={selectedTags.includes(tag) ? "selected" : ""} onClick={() => {dispatch(setSelectedTags(selectedTags.includes(tag) ? selectedTags.filter(t => t !== tag) : [...selectedTags, tag])); dispatch(setSelectedCategory({handle: "", title: ""}))}} key={tag}><Checkbox checked={selectedTags.includes(tag)} /> {tag}</li>)}
                    </ul>
                </aside>
                <main>
                    {productsToShow.length ? <div className="sorters">
                        <div className="icons"></div>
                        {/* <Select 
                            
                        /> */}
                    </div> : null}
                    {productsToShow.length ? <div className="products">
                        {productsToShow.map((product, i) => <Product key={product.id} {...product} i={i} />)}
                    </div> : null}

                    {productsToShow.length ? <div className="pagination">
                        <div onClick={goBack} className={`arrow ${hasPreviousPage ? "active" : ""}`}><span>&larr;</span> Përpara</div>
                        <div onClick={goForward} className={`arrow ${hasNextPage ? "active" : ""}`}>Pas <span>&rarr;</span></div>
                    </div> : null}

                    {loading ? null : <div className="recent">
                        <h1>Të shikuara së fundmi</h1>
                        <div className="products recently-viewed">
                            {recentlyViewedProducts.map((product, i) => <Product key={product.id} {...product} i={i} />)}
                        </div>
                    </div>}
                </main>
            </div>
        </section>
    )
}

export default Products;