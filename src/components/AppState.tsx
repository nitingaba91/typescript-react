import React, { createContext, useContext, useEffect, useReducer } from 'react';

 interface AppStateValue {
    cart: {
        items: cartItem[];
    }
}

export interface cartItem { id: number, name: string, price: number, qty: number };

interface Action<T> {
    type: T
}

interface AddToCartAction extends Action<'ADD_TO_CART'> {
    payload: {
        item: Omit<cartItem, 'qty'>;
    }
}


interface initializeCartAction extends Action<'INITIALIZE_CART'> {
    payload: {
        cart: AppStateValue['cart']
    }
}

const defaultStateValue: AppStateValue = {
    cart: {
        items: [],
    }
}

export const AppStateContext = createContext(defaultStateValue);

export const AppDispatchContext = createContext<React.Dispatch<AddToCartAction>
    | undefined>(undefined);

const reducer = (state: AppStateValue, action: AddToCartAction | initializeCartAction) => {
    if (action.type == 'ADD_TO_CART') {
        const itemToAdd = action.payload.item;
        const itemExist = state.cart.items.find((item) => item.id === itemToAdd.id);
        return {
            ...state,
            cart: {
                ...state.cart,
                items: itemExist ? state.cart.items.map((item) => {
                    if (item.id === itemToAdd.id) {
                        return { ...item, qty: item.qty + 1 }
                    }
                    return item;
                }) : [
                    ...state.cart.items,
                    { ...itemToAdd, qty: 1 }
                ]
            }
        }
    } else if(action.type == 'INITIALIZE_CART') {
        return { ...state, cart: action.payload.cart }
    }
    return state;
}

export const useStateDispatch = () => {
    const dispatch = useContext(AppDispatchContext);
    if (!dispatch) {
        throw new Error('Use state was called outside the appSetSatatContext provider');
    }
    return dispatch;
}


const AppStateProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultStateValue);

    useEffect(() => {
        const cart = window.localStorage.getItem('cart');
        if(cart) {
            dispatch({
                type: 'INITIALIZE_CART',
                payload: { cart: JSON.parse(cart) }
            })
        }
    }, [])

    useEffect(() => {
        window.localStorage.setItem('cart', JSON.stringify(state.cart))
    }, [state.cart])

    return <AppStateContext.Provider value={state}>
        <AppDispatchContext.Provider value={dispatch}>
            {children}
        </AppDispatchContext.Provider>

    </AppStateContext.Provider>
}

export default AppStateProvider;