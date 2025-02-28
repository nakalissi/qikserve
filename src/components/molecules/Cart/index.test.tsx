import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Cart from './index';
import { RootState } from '../../../redux/store';

const mockStore = configureStore([]);
const initialState: RootState = {
    settings: {
        settings: {
            currency: '$',
        },
    },
    cart: {
        total: 0,
        items: [],
    },
};

describe('Cart Component', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore(initialState);
    });

    test('renders empty cart message', () => {
        render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );

        expect(screen.getByText('Seu carrinho está vazio')).toBeInTheDocument();
    });

    test('renders cart items', () => {
        const stateWithItems = {
            ...initialState,
            cart: {
                total: 30,
                items: [
                    { id: 1, name: 'Item 1', description: 'Description 1', price: 10, quantity: 1 },
                    { id: 2, name: 'Item 2', description: 'Description 2', price: 20, quantity: 1 },
                ],
            },
        };
        store = mockStore(stateWithItems);

        render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );

        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
        expect(screen.getByText('$30.00')).toBeInTheDocument();
    });

    test('handles add item', () => {
        const stateWithItems = {
            ...initialState,
            cart: {
                total: 10,
                items: [
                    { id: 1, name: 'Item 1', description: 'Description 1', price: 10, quantity: 1 },
                ],
            },
        };
        store = mockStore(stateWithItems);

        render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );

        fireEvent.click(screen.getByText('+'));

        const actions = store.getActions();
        expect(actions).toContainEqual({
            type: 'cart/addItem',
            payload: { id: 1, name: 'Item 1', quantity: 1, price: 10 },
        });
    });

    test('handles remove item', () => {
        const stateWithItems = {
            ...initialState,
            cart: {
                total: 10,
                items: [
                    { id: 1, name: 'Item 1', description: 'Description 1', price: 10, quantity: 1 },
                ],
            },
        };
        store = mockStore(stateWithItems);

        render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );

        fireEvent.click(screen.getByText('-'));

        const actions = store.getActions();
        expect(actions).toContainEqual({
            type: 'cart/removeItem',
            payload: 1,
        });
    });
});