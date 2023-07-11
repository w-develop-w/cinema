import { createAction, createSlice } from "@reduxjs/toolkit"

export const setAllFilms = createAction("dataOfFilms/setAllFilms")
export const setImageFilm = createAction("dataOfFilms/setImageFilm")
export const setNameFilm = createAction("dataOfFilms/setNameFilm")
export const setDateFilm = createAction("dataOfFilms/setDateFilm")
export const setTimeFilm = createAction("dataOfFilms/setTimeFilm")
export const setCurrentTimeFilm = createAction("dataOfFilms/setCurrentTimeFilm")
export const setPlacesFilm = createAction("dataOfFilms/setPlacesFilm")
export const setIndexTimeFilm = createAction("dataOfFilms/setIndexTimeFilm")
export const setIndexOfDate = createAction("dataOfFilms/setIndexOfDate")
export const setIdOfDate = createAction("dataOfFilms/setIdOfDate")
export const setClickOnPlaces = createAction("dataOfFilms/setClickOnPlaces")

const dataOfFilmsSlice = createSlice({
    name: "dataOfFilms",
    initialState: {
        allFilms: [],
        imageFilm: "",
        nameFilm: "",
        dateFilm: "",
        timeFilm: [],
        currentTimeFilm: '',
        placesFilm: [],
        indexTimeFilm: -1,
        indexOfDate: -1,
        idOfDate: 0,
        clickOnPlaces: true,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setAllFilms, (state, action) => {
                state.allFilms = action.payload
            })
            .addCase(setImageFilm, (state, action) => {
                state.imageFilm = action.payload
            })
            .addCase(setNameFilm, (state, action) => {
                state.nameFilm = action.payload
            })
            .addCase(setDateFilm, (state, action) => {
                state.dateFilm = action.payload
            })
            .addCase(setTimeFilm, (state, action) => {
                state.timeFilm = action.payload
            })
            .addCase(setCurrentTimeFilm, (state, action) => {
                state.currentTimeFilm = action.payload
            })
            .addCase(setPlacesFilm, (state, action) => {
                state.placesFilm = action.payload
            })
            .addCase(setIndexTimeFilm, (state, action) => {
                state.indexTimeFilm = action.payload
            })
            .addCase(setIndexOfDate, (state, action) => {
                state.indexOfDate = action.payload
            })
            .addCase(setIdOfDate, (state, action) => {
                state.idOfDate = action.payload
            })
            .addCase(setClickOnPlaces, (state, action) => {
                state.clickOnPlaces = action.payload
            })
    },
})

export default dataOfFilmsSlice.reducer
