import { RootState } from '../types/aliases';

export const getBookingWidgetState = (state: RootState) => state.bookingWidget;

export const getNavbarState = (state: RootState) => state.navbar;

export const getSliderState = (state: RootState) => state.slider;

export const getImageState = (state: RootState) => state.image;
