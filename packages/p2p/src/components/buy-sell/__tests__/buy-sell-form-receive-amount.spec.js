import React from 'react';
import { screen, render } from '@testing-library/react';
import { useStores } from 'Stores';
import BuySellFormReceiveAmount from '../buy-sell-form-receive-amount.jsx';

jest.mock('Stores', () => ({
    ...jest.requireActual('Stores'),
    useStores: jest.fn(),
}));

describe('<BuySellFormReceiveAmount />', () => {
    const mocked_store_values = {
        advert: {
            local_currency: 'USD',
        },
        is_sell_advert: false,
        receive_amount: 0,
    };

    test('Component should be rendered, should render proper message, amount and currency', () => {
        useStores.mockImplementation(() => ({
            buy_sell_store: mocked_store_values,
        }));

        render(<BuySellFormReceiveAmount />);

        const el_label_container = screen.getByTestId('receive/send_label_container');
        const el_amount_container = screen.getByTestId('receive/send_amount_container');
        const el_send = screen.getByText("You'll send");
        const el_amount = screen.getByText('0.00 USD');

        expect(el_label_container).toBeInTheDocument();
        expect(el_amount_container).toBeInTheDocument();
        expect(el_send).toBeInTheDocument();
        expect(el_amount).toBeInTheDocument();
    });

    test('Component should render proper message if is_sell_advert prop is true', () => {
        useStores.mockImplementation(() => ({
            buy_sell_store: { ...mocked_store_values, is_sell_advert: true },
        }));

        render(<BuySellFormReceiveAmount />);

        const el_receive = screen.getByText("You'll receive");
        expect(el_receive).toBeInTheDocument();
    });
});
