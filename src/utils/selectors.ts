import { RootState } from '../types/aliases';

export const getBookingWidgetState = (state: RootState) => state.bookingWidget;

export const getNavbarState = (state: RootState) => state.navbar;

export const getSliderState = (state: RootState) => state.slider;

export const getDatabaseState = (state: RootState) => state.database;

export const getFilterState = (state: RootState) => state.filter;

export const getSortState = (state: RootState) => state.sort;

export const getProductCardState = (state: RootState) => state.product;

export const getCartState = (state: RootState) => state.cart;

export const getCurrentBrandNames = (state: RootState) => state.filter.currentBrandNames;
