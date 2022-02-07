import React from 'react';
import { DesktopWrapper, Icon, MobileFullPageModal, MobileWrapper, Text } from '@deriv/components';
import { observer } from 'mobx-react-lite';
import { my_profile_tabs } from 'Constants/my-profile-tabs';
import { useStores } from 'Stores';
import MyProfileStatsTable from './my-profile-stats-table';
import MyProfileSeparatorContainer from '../my-profile-separator-container';
import { Localize, localize } from 'Components/i18next';
import { isMobile } from '@deriv/shared';
import MyProfilePrivacy from './my-profile-privacy';

const MyProfileStats = () => {
    const { my_profile_store } = useStores();
    const [should_show_stats_and_ratings, setShouldShowStatsAndRatings] = React.useState(false);

    return (
        <React.Fragment>
            <MobileFullPageModal
                height_offset='80px'
                is_flex
                is_modal_open={should_show_stats_and_ratings}
                page_header_text={localize('Stats and ratings')}
                pageHeaderReturnFn={() => setShouldShowStatsAndRatings(false)}
            >
                <MyProfileStatsTable />
            </MobileFullPageModal>
            <MyProfileSeparatorContainer.Line className='my-profile-stats-separator' is_invisible={isMobile()} />
            <DesktopWrapper>
                <MyProfileStatsTable />
            </DesktopWrapper>
            <MobileWrapper>
                <MyProfilePrivacy />
                <MyProfileSeparatorContainer.Line className='my-profile-stats-separator' />
                <div className='my-profile__navigation' onClick={() => setShouldShowStatsAndRatings(true)}>
                    <Text color='prominent' size='xxs'>
                        <Localize i18n_default_text='Stats and ratings' />
                    </Text>
                    <Icon icon='IcChevronRight' />
                </div>
                <MyProfileSeparatorContainer.Line className='my-profile-stats-separator' />
                <div
                    className='my-profile__navigation'
                    onClick={() => my_profile_store.setActiveTab(my_profile_tabs.PAYMENT_METHODS)}
                >
                    <Text color='prominent' size='xxs'>
                        <Localize i18n_default_text='Payment methods' />
                    </Text>
                    <Icon icon='IcChevronRight' />
                </div>
                <MyProfileSeparatorContainer.Line className='my-profile-stats-separator' />
                <div
                    className='my-profile__navigation'
                    onClick={() => my_profile_store.setActiveTab(my_profile_tabs.AD_TEMPLATE)}
                >
                    <Text color='prominent' size='xxs'>
                        <Localize i18n_default_text='Ad template' />
                    </Text>
                    <Icon icon='IcChevronRight' />
                </div>
                <MyProfileSeparatorContainer.Line className='my-profile-stats-separator' />
            </MobileWrapper>
        </React.Fragment>
    );
};

export default observer(MyProfileStats);
