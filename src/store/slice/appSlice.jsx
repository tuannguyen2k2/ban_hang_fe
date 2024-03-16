import { createSlice } from '@reduxjs/toolkit';
import { getData } from '../../utils/localStorage';
export const appSlice = createSlice({
    name: 'app',
    initialState: {
        appLoading: 0,
        category: { listCategory: [], loadingCategory: false },
        cart: { notiAddCartSuccess: false, content: getData('cart') },
    },
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        showAppLoading: (state, action) => {
            state.appLoading++;
        },
        hideAppLoading: (state, action) => {
            state.appLoading = Math.max(0, state.appLoading - 1);
        },
        toggleActionLoading: (state, action) => {
            if (action.payload.isLoading) {
                state[action.payload.type] = true;
            } else {
                delete state[action.payload.type];
            }
        },
    },
});

export const { setCart, setCategory, showAppLoading, hideAppLoading, toggleActionLoading } = appSlice.actions;
export default appSlice.reducer;
