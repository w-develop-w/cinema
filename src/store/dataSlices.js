import { createSlice } from "@reduxjs/toolkit"

const dataOfFilmsSlice = createSlice({
    name: "dataOfFilms",
    initialState: {
        // все фильмы - массив со всеми объектами
        data: [],
        nameFilm: '',
        dateFilm: '',
        timeFilm: [],
        placesFilm: JSON.parse(localStorage.getItem("placesLocal")) || [],
        indexTimeFilm: -1,
        indexOfDate: -1,
        idOfDate: 0,
        // allFilms - получаю все фильмы из mockApi
        allFilms: [],
        clickOnPlaces: true
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
        setAllFilms: (state, action) => {
            state.allFilms = action.payload
        }, 
        setClickOnPlaces: (state, action) => {
            state.clickOnPlaces = action.payload
        }
    },
})

export const { setData, setIndexOfDate, setIdOfDate, setNameFilm, setDateFilm, setTimeFilm, setIndexTimeFilm, setPlacesFilm, setAllFilms, setClickOnPlaces } = dataOfFilmsSlice.actions
export default dataOfFilmsSlice.reducer
