import React from 'react';
import { screen, render } from '@testing-library/react';
import { isDesktop } from '@deriv/shared';
import { useStores } from 'Stores';
import BuySellTable from '../buy-sell-table.jsx';

jest.mock('Stores', () => ({
    ...jest.requireActual('Stores'),
    useStores: jest.fn(),
}));

jest.mock('@deriv/components', () => ({
    ...jest.requireActual('@deriv/components'),
    Loading: () => <div>Loading</div>,
}));

jest.mock('Components/table/table-error.jsx', () => ({
    ...jest.requireActual('Components/table/table-error.jsx'),
    TableError: ({ message }) => <div>{message}</div>,
}));

jest.mock('@deriv/shared/src/utils/screen/responsive', () => ({
    ...jest.requireActual('@deriv/shared/src/utils/screen/responsive'),
    isDesktop: jest.fn(),
}));

const setItems = jest.fn();
const setIsLoading = jest.fn();
const loadMoreItems = jest.fn();

const mocked_buy_sell_store = {
    api_error_message: '',
    has_more_items_to_load: false,
    is_loading: false,
    items: [],
    loadMoreItems,
    rendered_items: [],
    setItems,
    setIsLoading,
};

const mocked_general_store = {
    client: {
        currency: 'USD',
    },
};

describe('<BuySellTable />', () => {
    it('Should render empty component if items prop is empty', () => {
        useStores.mockImplementation(() => ({
            buy_sell_store: mocked_buy_sell_store,
        }));
        render(<BuySellTable />);

        expect(screen.getByTestId('dp2p-P2pEmpty_container')).toBeInTheDocument();
    });

    it('Should render Loading component if is_loading is true', () => {
        useStores.mockImplementation(() => ({
            buy_sell_store: { ...mocked_buy_sell_store, is_loading: true },
        }));
        render(<BuySellTable />);

        expect(screen.getByText('Loading')).toBeInTheDocument();
    });

    it('Should render TableError component if has an api_error_message', () => {
        useStores.mockImplementation(() => ({
            buy_sell_store: { ...mocked_buy_sell_store, api_error_message: 'test' },
        }));
        render(<BuySellTable />);

        expect(screen.getByText('test')).toBeInTheDocument();
    });

    it('Component should be rendered', () => {
        useStores.mockImplementation(() => ({
            buy_sell_store: { ...mocked_buy_sell_store, items: [{ test: 'test' }] },
            general_store: mocked_general_store,
        }));
        isDesktop.mockReturnValue(true);
        render(<BuySellTable />);

        expect(screen.getByText('Advertisers')).toBeInTheDocument();
        expect(screen.getByText('Limits')).toBeInTheDocument();
        expect(screen.getByText('Rate (1 USD)')).toBeInTheDocument();
    });
});
