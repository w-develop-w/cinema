import { useDispatch, useSelector } from "react-redux"
import { setPlacesFilm } from "../../store/dataSlices"
import styles from "./Places.module.scss"

function Places() {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.dataOfFilms)

    const placesLocal = JSON.parse(localStorage.getItem("placesLocal"))
    console.log(placesLocal)

    const keys = Object.keys(placesLocal)
    const values = Object.values(data.placesFilm)

    const clickOnPlace = (index) => {
        if (values[index] === true) {
            // change true on false
            values[index] = false

            // unite keys and values in object
            const result = keys.reduce((obj, key, index) => {
                obj[key] = values[index]
                return obj
            }, {})

            // assign result to placesLOcal
            localStorage.setItem("placesLocal", JSON.stringify(result))
            dispatch(
                setPlacesFilm(JSON.parse(localStorage.getItem("placesLocal")))
            )
        } else {
            // change true on false
            values[index] = true

            // unite keys and values in object
            const result = keys.reduce((obj, key, index) => {
                obj[key] = values[index]
                return obj
            }, {})

            localStorage.setItem("placesLocal", JSON.stringify(result))
            dispatch(
                setPlacesFilm(JSON.parse(localStorage.getItem("placesLocal")))
            )
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
        </div>
    )
}

export default Places
