import { configureStore } from '@reduxjs/toolkit';

import { actions as bookingWidgetActions, reducer as bookingWidgetSlice } from './bookingWidgetSlice';
import { actions as navbarWidgetActions, reducer as navbarWidgetSlice } from './navbarSlice';
import { actions as sliderActions, reducer as sliderSlice } from './sliderSlice';

export const actions = {
  ...bookingWidgetActions,
  ...navbarWidgetActions,
  ...sliderActions,
};

export const store = configureStore({
  reducer: {
    bookingWidget: bookingWidgetSlice,
    navbar: navbarWidgetSlice,
    slider: sliderSlice,
  },
});
