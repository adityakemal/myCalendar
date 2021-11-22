import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from '../features/caldendar/calendar.reducer';

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
});
