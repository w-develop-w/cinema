import { createSlice } from "@reduxjs/toolkit"

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
    reducers: {
        setAllFilms: (state, action) => {
            state.allFilms = action.payload
        },
        setImageFilm: (state, action) => {
            state.imageFilm = action.payload
        },
        setNameFilm: (state, action) => {
            state.nameFilm = action.payload
        },
        setDateFilm: (state, action) => {
            state.dateFilm = action.payload
        },
        setTimeFilm: (state, action) => {
            state.timeFilm = action.payload
        },
        setCurrentTimeFilm: (state, action) => {
            state.currentTimeFilm = action.payload
        },
        setPlacesFilm: (state, action) => {
            state.placesFilm = action.payload
        },
        setIndexTimeFilm: (state, action) => {
            state.indexTimeFilm = action.payload
        },
        setIndexOfDate: (state, action) => {
            state.indexOfDate = action.payload
        },
        setIdOfDate: (state, action) => {
            state.idOfDate = action.payload
        },
        setClickOnPlaces: (state, action) => {
            state.clickOnPlaces = action.payload
        },
    },
})

export const {
    setData,
    setIndexOfDate,
    setIdOfDate,
    setImageFilm,
    setNameFilm,
    setDateFilm,
    setTimeFilm,
    setCurrentTimeFilm,
    setIndexTimeFilm,
    setPlacesFilm,
    setAllFilms,
    setClickOnPlaces,
} = dataOfFilmsSlice.actions
export default dataOfFilmsSlice.reducer
