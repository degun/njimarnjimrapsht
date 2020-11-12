export function priced(number){
    return new Intl.NumberFormat('sq-AL', { style: 'currency', currency: 'ALL' }).format(number)
}

export function transformProducts(products){
    return products.map(({node}) => {
        const {id, title, handle, priceRange, compareAtPriceRange, images} = node;
        return {
            id, 
            title,
            handle,
            price: priceRange.minVariantPrice.amount,
            compareAtPrice: compareAtPriceRange?.minVariantPrice?.amount,
            image: images.edges[0].node.transformedSrc
        }
    });
}