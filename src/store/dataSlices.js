import { createSlice } from "@reduxjs/toolkit"

const dataOfFilmsSlice = createSlice({
    name: "dataOfFilms",
    initialState: {
        data: [],
        nameFilm: '',
        dateFilm: '',
        timeFilm: [],
        placesFilm: [],
        indexTimeFilm: -1,
        indexOfDate: -1,
        idOfDate: 0,
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload
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
    },
})

export const { setData, setIndexOfDate, setIdOfDate, setNameFilm, setDateFilm, setTimeFilm, setIndexTimeFilm, setPlacesFilm } = dataOfFilmsSlice.actions
export default dataOfFilmsSlice.reducer
