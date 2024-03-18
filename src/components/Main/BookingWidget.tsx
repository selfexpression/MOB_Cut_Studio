import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from '../../slices/bookingWidgetSlice';
import { getBookingWidgetState } from '../../utils/selectors';

import { Widget } from './Widget';

export const BookingWidget: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { isOpenWidget } = useSelector(getBookingWidgetState);
  const formLink = process.env.REACT_APP_YCLIENTS_FORM as string;

  const handleToggleWidget = () => {
    dispatch(actions.toggleWidget(!isOpenWidget));
  };

  return (
    <Widget
      isOpenWidget={isOpenWidget}
      handleToggleWidget={handleToggleWidget}
      formLink={formLink}
    />
  );
};
