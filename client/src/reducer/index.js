import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import flashCardReducer from "../slices/flashCardSlice";

const rootReducer= combineReducers({
    auth: authReducer,
    flashcard: flashCardReducer, 
})

export default rootReducer;