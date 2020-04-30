import { Dialog } from '@deriv/components';
import PropTypes from 'prop-types';
import React from 'react';
import { localize, Localize } from '@deriv/translations';
import { connect } from 'Stores/connect';
import { website_name } from 'App/Constants/app-config';

const DenialOfServiceModal = ({ disableApp, enableApp, is_loading, is_visible, onCancel, onConfirm }) => (
    <Dialog
        title={localize("That's not ready yet!")}
        confirm_button_text={localize('Stay on {{website_name}}', { website_name })}
        cancel_button_text={localize('Go to Binary')}
        onConfirm={onConfirm}
        onCancel={onCancel}
        disableApp={disableApp}
        enableApp={enableApp}
        is_loading={is_loading}
        is_closed_on_cancel={false}
        is_visible={is_visible}
    >
        <Localize
            i18n_default_text='Real money account is currently unavailable on {{website_name}} but it’s in the works.'
            values={{ website_name }}
        />
    </Dialog>
);

DenialOfServiceModal.propTypes = {
    disableApp: PropTypes.func,
    enableApp: PropTypes.func,
    is_loading: PropTypes.bool,
    is_visible: PropTypes.bool,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
};

export default connect(({ ui }) => ({
    disableApp: ui.disableApp,
    enableApp: ui.enableApp,
    is_loading: ui.is_loading,
}))(DenialOfServiceModal);
