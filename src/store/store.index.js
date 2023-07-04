import { configureStore } from "@reduxjs/toolkit";
import dataOfFilmsReducer from './dataSlices'

export default configureStore({
    reducer: {
        dataOfFilms: dataOfFilmsReducer, 
        
    },
})