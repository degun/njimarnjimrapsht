import gql from 'graphql-tag';

export const GET_PRODUCTS = gql`
    query getProducts($first: Int $query: String $after: String){
        products(first: $first after: $after query: $query){
            pageInfo { 
                hasNextPage
                hasPreviousPage
            }
            edges{
                cursor
                node{
                    id 
                    title
                    handle
                    description
                    images(first: 1){
                        edges{
                            node{
                                id
                                transformedSrc
                            }
                        }
                    }
                    priceRange{
                        minVariantPrice{
                          amount
                        }
                        maxVariantPrice{
                            amount
                          }
                    }
                    compareAtPriceRange{
                        minVariantPrice{
                          amount
                        }
                        maxVariantPrice{
                            amount
                          }
                    }
                }
            }
        }
    }
`;

export const GET_PRODUCT = gql`
    query getProduct($handle: String!){
        productByHandle(handle: $handle) {
            id
            title
            description
            images(first: 20){
                edges{
                    node{
                        id
                        altText
                        transformedSrc
                    }
                }
            }
            variants(first: 10) {
                edges {
                    node {
                        id
                        title
                        image{
                            transformedSrc
                        }
                        availableForSale
                        currentlyNotInStock
                        priceV2 {
                            amount
                        }
                        compareAtPriceV2 {
                            amount
                        }
                    }
                }
            }
        }
    }
`;

export const GET_PRODUCT_RECOMMENDATIONS = gql`
    query getProductRecommendations($productId: ID!){
        productRecommendations(productId: $productId) {
            id
            title
            handle
            priceRange{
                minVariantPrice{
                    amount
                }
            }
            compareAtPriceRange{
                minVariantPrice{
                    amount
                }
            }
            description
            images(first: 1){
                edges{
                    node{
                        id
                        altText
                        transformedSrc
                    }
                }
            }
        }
    }
`;

export const GET_SMART_COLLECTIONS = gql`
    query getSmartCollections{
        collections(first: 100 query: "collection_type:smart"){
            edges{
                node{
                    id title handle image{transformedSrc} description
                }
            }
        }
    }
`;

export const GET_CUSTOM_COLLECTIONS = gql`
    query getCustomCollections{
        collections(first: 100 query: "collection_type:custom"){
            edges{
                node{
                    id title handle
                }
            }
        }
    }
`;

export const GET_COLLECTION_PRODUCTS = gql`
    query getCollectionProducts($handle: String! $first: Int! $after: String){
        collectionByHandle(handle: $handle){
            image{transformedSrc}
            products(first: $first after: $after){
                pageInfo { 
                    hasNextPage
                    hasPreviousPage
                }
                edges{
                    cursor
                    node{
                        id 
                        title
                        handle
                        images(first: 1){
                            edges{
                                node{
                                    id
                                    transformedSrc
                                }
                            }
                        }
                        priceRange{
                            minVariantPrice{
                              amount
                            }
                            maxVariantPrice{
                                amount
                              }
                        }
                        compareAtPriceRange{
                            minVariantPrice{
                              amount
                            }
                            maxVariantPrice{
                                amount
                              }
                        }
                    }
                }
            }
        }
    }
`;

export const GET_TAGS = gql`
    query getTags{
      productTags(first: 20){
        edges{
          node
        }
      }
    }
`;

export const GET_TYPES = gql`
    query getTypes{
      productTypes(first: 20){
        edges{
          node
        }
      }
    }
`;

export const GET_CHECKOUT = gql`
    query getCheckout{
        checkout{
            id
            webUrl
            totalTax
            subtotalPrice
            totalPrice
            lineItems (first: 250) {
                edges {
                    node {
                    id
                    title
                    variant {
                        id
                        title
                        image {
                        src
                        }
                        price
                    }
                    quantity
                    }
                }
            }
        }
    }
`;