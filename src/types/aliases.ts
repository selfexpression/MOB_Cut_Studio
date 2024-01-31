import { store } from '../slices/index';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
