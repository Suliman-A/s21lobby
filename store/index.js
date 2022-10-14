import {configureStore} from '@reduxjs/toolkit';
import uiSlice from './ui-slice';
import errorSlice from './error-slice';
import authSlice from './auth-slice';
import tablesSlice from './tables-slice';
import userSlice from './user-slice';

const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        error: errorSlice.reducer,
        auth: authSlice.reducer,
        tables: tablesSlice.reducer,
        user: userSlice.reducer
    }
});

export default store;