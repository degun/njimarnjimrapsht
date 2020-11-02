import gql from 'graphql-tag';

export const GET_PRODUCTS = gql`
    query getProducts($first: Int $query: String){
        products(first: $first query: $query){
            edges{
                node{
                    id 
                    title
                    description
                    images(first: 1){
                        edges{
                            node{
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

export const GET_SMART_COLLECTIONS = gql`
    query getSmartCollections{
        collections(first: 100 query: "collection_type:smart"){
            edges{
                node{
                    title handle image{transformedSrc} description
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
                    title handle
                }
            }
        }
    }
`;

export const GET_COLLECTION_PRODUCTS = gql`
    query getCollectionProducts($handle: String! $first: Int!){
        collectionByHandle(handle: $handle){
            image{transformedSrc}
            products(first: $first){
                edges{
                    node{
                        id 
                        title
                        images(first: 1){
                            edges{
                                node{
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
`