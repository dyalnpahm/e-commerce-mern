import { reducer } from '../utils/reducers';

import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    UPDATE_CART_QUANTITY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    TOGGLE_CART
} from '../utils/action';

const state = {
    products: [],
    cart: [
        {_id: '1',
        name: 'Ring',
        purchaseQuantity: 1
    },
    {
        _id: '2',
        name: 'Necklace',
        purchaseQuantity: 3

    }
    ],
cartOpen: false,
categories: [{name: "Diver's Watch"}],
currentCategory: '1',

};

test ('UPDATE_PRODUCTS', () => {
    const newState = reducer(state, {
        type: UPDATE_PRODUCTS,
        products: [{}, {}]
    });

    expect(newState.products.length).toStrictEqual(2);
    expect(state.products.length).toStrictEqual(0);
});

test ('UPDATE_CATEGORIES', () => {
    const newState = reducer(state, {
        type: UPDATE_CATEGORIES,
        categories: [{}, {}]
    });

    expect(newState.categories.length).toStrictEqual(2);
    expect(state.categories.length).toStrictEqual(1);
});

test ('UPDATE_CURRENT_CATEGORY', () => {
    const newState = reducer(state, {
        type: UPDATE_CURRENT_CATEGORY,
        currentCategory: '2'
    });

    expect(newState.currentCategory).toStrictEqual('2');
    expect(state.currentCategory).toStrictEqual('1');
});

test ('UPDATE_CART_QUANTITY', () => {   
    const newState = reducer(state, {
        type: UPDATE_CART_QUANTITY,
        _id: '1',
        purchaseQuantity: 3
    });

    expect(newState.cart.length).toStrictEqual(2);
    expect(state.cart.length).toStrictEqual(2);
});

test ('ADD_TO_CART', () => {
    const newState = reducer(state, {
        type: ADD_TO_CART,
        product: {purchaseQuantity: 1}
    });
    expect(newState.cart.length).toStrictEqual(3);
    expect(state.cart.length).toStrictEqual(2);
});

test ('ADD_MULTIPLE_TO_CART', () => {
    const newState = reducer(state, {
        type: ADD_MULTIPLE_TO_CART,
        products: [{}, {}]
    });
    expect(newState.cart.length).toStrictEqual(4);
    expect(state.cart.length).toStrictEqual(2);
});

test ('REMOVE_FROM_CART', () => {
    const newState1 = reducer(state, {
        type: REMOVE_FROM_CART,
        _id: '1'
    });
    expect(newState1.cartOpen).toStrictEqual(true);
    expect(newState1.cart.length).toStrictEqual(1);
    expect(newState1.cart[0]._id).toStrictEqual('2');

    const newState2 = reducer(newState1, {
        type: REMOVE_FROM_CART,
        _id: '2'
    });
    expect(newState2.cartOpen).toStrictEqual(false);
    expect(newState2.cart.length).toStrictEqual(0);
    expect(newState2.cart[0]).toBeUndefined();
    expect(state.cart.length).toStrictEqual(2);

});

test ('CLEAR_CART', () => {
    const newState = reducer(state, {
        type: CLEAR_CART
    });
    expect(newState.cartOpen).toStrictEqual(false);
    expect(newState.cart.length).toStrictEqual(0);
    expect(state.cart.length).toStrictEqual(2);
});

test ('TOGGLE_CART', () => {
    const newState = reducer(state, {
        type: TOGGLE_CART
    });
    expect(newState.cartOpen).toStrictEqual(true);
    expect(state.cartOpen).toStrictEqual(false);
   
    const newState2 = reducer(newState, {
        type: TOGGLE_CART
    });
    expect(newState2.cartOpen).toStrictEqual(false);
    
});



