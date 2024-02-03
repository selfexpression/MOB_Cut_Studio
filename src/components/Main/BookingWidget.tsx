import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { actions } from '../../slices/bookingWidgetSlice';
import { getBookingWidgetState } from '../../utils/selectors';
import { CloseIcon } from '../temp/CloseIcon';

export const BookingWidget: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isOpenWidget } = useSelector(getBookingWidgetState);
  const formLink = process.env.REACT_APP_YCLIENTS_FORM;

  const handleToggleWidget = () => {
    dispatch(actions.toggleWidget(!isOpenWidget));
  };

  return (
    <aside className={classNames('booking-widget', {
      'show-booking': isOpenWidget,
      'hide-booking': !isOpenWidget,
    })}>
      <iframe
        title={t('others.yclients')}
        src={formLink}
        className="booking-frame"
      >
      </iframe>
      <button
        type="button"
        aria-label={t('ariaLabels.closeBtn')}
        onClick={handleToggleWidget}
        className="close-btn"
      >
        <CloseIcon />
      </button>
    </aside>
  );
};
