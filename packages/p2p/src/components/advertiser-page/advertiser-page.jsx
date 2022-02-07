import React from 'react';
import { Loading, Text } from '@deriv/components';
import { isMobile } from '@deriv/shared';
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { buy_sell } from 'Constants/buy-sell';
import BuySellModal from 'Components/buy-sell/buy-sell-modal.jsx';
import UserAvatar from 'Components/user/user-avatar/user-avatar.jsx';
import { useStores } from 'Stores';
import AdvertiserPageStats from './advertiser-page-stats.jsx';
import AdvertiserPageAdverts from './advertiser-page-adverts.jsx';
import TradeBadge from '../trade-badge/trade-badge.jsx';
import './advertiser-page.scss';

const AdvertiserPage = () => {
    const { advertiser_page_store } = useStores();

    const { basic_verification, completed_orders_count, first_name, full_verification, last_name } =
        advertiser_page_store.advertiser_info;

    React.useEffect(() => {
        advertiser_page_store.onMount();

        return reaction(
            () => advertiser_page_store.active_index,
            () => advertiser_page_store.onTabChange(),
            { fireImmediately: true }
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (advertiser_page_store.is_loading) {
        return <Loading is_fullscreen={false} />;
    }

    if (advertiser_page_store.error_message) {
        return <div className='advertiser-page__error'>{advertiser_page_store.error_message}</div>;
    }

    return (
        <div className='advertiser-page'>
            <BuySellModal
                selected_ad={advertiser_page_store.advert}
                should_show_popup={advertiser_page_store.show_ad_popup}
                setShouldShowPopup={advertiser_page_store.setShowAdPopup}
                table_type={advertiser_page_store.counterparty_type === buy_sell.BUY ? buy_sell.BUY : buy_sell.SELL}
            />
            <div className='advertiser-page__header-details'>
                <UserAvatar
                    nickname={advertiser_page_store.advertiser_details_name}
                    size={isMobile() ? 32 : 64}
                    text_size={isMobile() ? 's' : 'sm'}
                />
                <div className='advertiser-page__header-name--column'>
                    <div className='advertiser-page__header-name'>
                        <Text color='prominent' line-height='m' size='s' weight='bold'>
                            {advertiser_page_store.advertiser_details_name}
                        </Text>
                        {first_name && last_name && (
                            <div className='advertiser-page__header-real-name'>
                                <Text color='less-prominent' line_height='xs' size='xs'>
                                    {`(${first_name} ${last_name})`}
                                </Text>
                            </div>
                        )}
                    </div>
                    <TradeBadge
                        is_poa_verified={full_verification}
                        is_poi_verified={basic_verification}
                        trade_count={completed_orders_count}
                        large
                    />
                </div>
            </div>

            <AdvertiserPageStats />
            <AdvertiserPageAdverts />
        </div>
    );
};

AdvertiserPage.propTypes = {
    active_index: PropTypes.number,
    advert: PropTypes.object,
    advertiser_info: PropTypes.object,
    adverts: PropTypes.array,
    api_error_message: PropTypes.string,
    counterparty_type: PropTypes.string,
    error_message: PropTypes.string,
    form_error_message: PropTypes.string,
    handleTabItemClick: PropTypes.func,
    height_values: PropTypes.array,
    is_loading: PropTypes.bool,
    is_submit_disabled: PropTypes.bool,
    item_height: PropTypes.number,
    modal_title: PropTypes.string,
    onCancelClick: PropTypes.func,
    onConfirmClick: PropTypes.func,
    onMount: PropTypes.func,
    onTabChange: PropTypes.func,
    setFormErrorMessage: PropTypes.func,
    setIsSubmitDisabled: PropTypes.func,
    setSubmitForm: PropTypes.func,
    show_ad_popup: PropTypes.bool,
    showAdPopup: PropTypes.func,
    submitForm: PropTypes.func,
};

export default observer(AdvertiserPage);
