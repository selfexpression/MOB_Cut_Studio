import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

import { actions } from '../../slices/bookingWidgetSlice';
import { getBookingWidgetState } from '../../utils/selectors';
import { CloseIcon } from '../Icons/CloseIcon';

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
      <div className="booking-header d-flex justify-content-end align-items-end">
        <button
          type="button"
          aria-label={t('ariaLabels.closeBtn')}
          onClick={handleToggleWidget}
          className="interactive-button booking-widget-btn p-0"
        >
          <CloseIcon />
        </button>
      </div>
      <div className="p-0 m-0">
        <iframe
          title={t('others.yclients')}
          src={formLink}
          className="p-0 m-0 w-100 vh-100 booking-frame"
        />
      </div>
    </aside>
  );
};
