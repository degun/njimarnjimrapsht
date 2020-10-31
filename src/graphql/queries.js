import gql from 'graphql-tag';

export const SHOP = gql`
    query shop{
        shop {
          priceRules(first: 3) {
            edges {
              node {
                id
                status
                target
                itemEntitlements {
                  products(first: 10) {
                    edges {
                      node {
                        id
                        title
                        priceRangeV2 {
                          maxVariantPrice {
                            amount
                          }
                          minVariantPrice {
                            amount
                          }
                        }
                        variants(first:1){
                          edges{
                            node{
                              compareAtPrice
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }      
`;

export const GET_COLLECTIONS = gql`
    query getCollections($query: String){
        collections(first: 100 query: $query){
            edges{
                node{
                    id title handle
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
                        }
                    }
                }
            }
        }
    }
`