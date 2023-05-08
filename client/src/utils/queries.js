import { gql } from '@apollo/client';

export const QUERY_CATEGORIES = gql `
{
    categories {
        _id
        name
    }
}
`;
export const QUERY_PRODUCTS = gql `
{
    products {
        _id
        name
        description
        price
        quantity
        image
        category {
            _id
            name
        }
    }
}
`;


export const QUUERY_ALL_PRODUCTS = gql `
{
    products {
        _id
        name
        description
        price
        quantity
        image
        category {
            _id
            name
        }
    }
}
`;


export const QUERY_USER = gql `
{
    user {
        firstName
        lastName
        email
        orders {
            _id
            purchaseDate
            products {
                _id
                name
                description
                price
                
                image
            }
        }
    }
}
`;

export const QUERY_CHECKOUT = gql `
query getCheckout($products: [ID]!) {
    checkout(products: $products) {
        session
    }
}
`;
