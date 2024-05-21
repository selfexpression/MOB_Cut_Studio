import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from '../../slices/bookingWidgetSlice';
import { getBookingWidgetState } from '../../utils/selectors';
import { linkRoutes } from '../../utils/routes';

import { Widget } from './Widget';

export const BookingWidget: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { isOpenWidget } = useSelector(getBookingWidgetState);

  const handleToggleWidget = () => {
    dispatch(actions.toggleWidget(!isOpenWidget));
  };

  return (
    <Widget
      isOpenWidget={isOpenWidget}
      handleToggleWidget={handleToggleWidget}
      formLink={linkRoutes.yclientsForm()}
    />
  );
};
