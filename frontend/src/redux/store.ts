import {configureStore} from '@reduxjs/toolkit';

import userSlice from './slices/user';
import taskSlice from './slices/task';

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        tasks: taskSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch