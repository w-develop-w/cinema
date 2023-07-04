import { useSelector } from "react-redux"
import styles from "./Places.module.scss"

function Places() {
    const data = useSelector((state) => state.dataOfFilms)
    const keys = Object.keys(data.placesFilm)
    const values = Object.values(data.placesFilm)

    console.log(data.placesFilm)

    return (
        <div>
            {keys.map((item, index) => (
                <button
                    style={{ backgroundColor: values[index] ? "green" : "red" }}
                    key={index}
                >
                    {item}
                </button>
            ))}
            {/* {values.map(item => <h3>{it em}</h3>)} */}
        </div>
    )
}

export default Places
