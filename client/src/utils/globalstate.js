import React , { createContext, useContext, useReducer } from 'react';
import { useProductReducer } from './reducers';

const Store = createContext();
const { Provider } = Store;

const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useReducer(useProductReducer, {
        products: [],
        cart: [],
        cartOpen: false,
        categories: [],
        currentCategory: ''
    });
    // to confirm it works!
    console.log(state);
    return <Provider value={[state, dispatch]} {...props} />;

};

const useStoreContext = () => {
    return useContext(Store);
};

export { StoreProvider, useStoreContext };
