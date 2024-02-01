import { configureStore } from '@reduxjs/toolkit';

import { actions as bookingWidgetActions, reducer as bookingWidgetSlice } from './bookingWidgetSlice';
import { actions as navbarWidgetActions, reducer as navbarWidgetSlice } from './navbarSlice';
import { actions as sliderActions, reducer as sliderSlice } from './sliderSlice';
import { actions as imageActions, reducer as imageSlice } from './imageSlice';

export const actions = {
  ...bookingWidgetActions,
  ...navbarWidgetActions,
  ...sliderActions,
  ...imageActions,
};

export const store = configureStore({
  reducer: {
    bookingWidget: bookingWidgetSlice,
    navbar: navbarWidgetSlice,
    slider: sliderSlice,
    image: imageSlice,
  },
});
