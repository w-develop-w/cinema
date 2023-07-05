import { useDispatch, useSelector } from "react-redux"
import { setPlacesFilm } from "../../store/dataSlices"
import styles from "./Places.module.scss"

function Places() {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.dataOfFilms)
    const keys = Object.keys(data.placesFilm)
    const values = Object.values(data.placesFilm)

    console.log(data.placesFilm)

    const clickOnPlace = (index) => {
        if (values[index] === true) {
            // change true on false
            values[index] = false

            // unite keys and values in object
            const result = keys.reduce((obj, key, index) => {
                obj[key] = values[index]
                return obj
            }, {})

            // console.log(result)

            // assign result to placesFilm
            dispatch(setPlacesFilm(result))
        } else {
            // change true on false
            values[index] = true

            // unite keys and values in object
            const result = keys.reduce((obj, key, index) => {
                obj[key] = values[index]
                return obj
            }, {})

            // console.log(result)

            // assign result to placesFilm
            dispatch(setPlacesFilm(result))
        }
    }

    return (
        <div>
            {keys.map((item, index) => (
                <button
                    style={{ backgroundColor: values[index] ? "green" : "red" }}
                    key={index}
                    onClick={() => {
                        clickOnPlace(index)
                    }}
                >
                    {item}
                </button>
            ))}

            {/* {values.map(item => <h3>{it em}</h3>)} */}
        </div>
    )
}

export default Places
