import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    allCards: [],
    pagination: {
        currentPage: 1,
        totalPages: 1,
        limit: 25,
    },
};

const flashCardSlice = createSlice({
    name: "flashCard",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setAllCards: (state, action) => {
            state.allCards = action.payload;
        },
        setPagination: (state, action) => {
            state.pagination = action.payload;
        },
    },
});

export const { setLoading, setAllCards, setPagination } =
    flashCardSlice.actions;

export default flashCardSlice.reducer;
