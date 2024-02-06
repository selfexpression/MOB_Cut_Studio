import { configureStore } from '@reduxjs/toolkit';

import { actions as bookingWidgetActions, reducer as bookingWidgetSlice } from './bookingWidgetSlice';
import { actions as navbarWidgetActions, reducer as navbarWidgetSlice } from './navbarSlice';
import { actions as sliderActions, reducer as sliderSlice } from './sliderSlice';
import { actions as databaseActions, reducer as databaseSlice } from './databaseSlice';
import { actions as sortMenuActions, reducer as sortMenuSlice } from './sortMenuSlice';
import { reducer as filterMenuSlice, actions as filterMenuActions } from './filterMenuSlice';
import { reducer as productCardSlice, actions as productCardActions } from './productCardSlice';
import { reducer as cartSlice, actions as cartActions } from './cartSlice';

export const actions = {
  ...bookingWidgetActions,
  ...navbarWidgetActions,
  ...sliderActions,
  ...databaseActions,
  ...sortMenuActions,
  ...filterMenuActions,
  ...productCardActions,
  ...cartActions,
};

export const store = configureStore({
  reducer: {
    bookingWidget: bookingWidgetSlice,
    navbar: navbarWidgetSlice,
    slider: sliderSlice,
    database: databaseSlice,
    sort: sortMenuSlice,
    filter: filterMenuSlice,
    product: productCardSlice,
    cart: cartSlice,
  },
});
