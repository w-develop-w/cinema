import { useDispatch, useSelector } from "react-redux"
import { setIndexTimeFilm, setPlacesFilm } from "../../store/dataSlices"
import styles from "./Film.module.scss"
import { Link, json } from "react-router-dom"
import { useEffect } from "react"

function Film() {
    const data = useSelector((state) => state.dataOfFilms)
    const dispatch = useDispatch()

    const clickOnTime = (item) => {
        const indexTime = data.timeFilm.indexOf(item)

        data.data.map((item) => {
            if (item.name === data.nameFilm) {
                dispatch(
                    setPlacesFilm(item.places[data.indexOfDate][indexTime])
                )
                localStorage.setItem(
                    "placesLocal",
                    JSON.stringify(item.places[data.indexOfDate][indexTime])
                )
            }
        })
    }

    const filmLocal = JSON.parse(localStorage.getItem("filmLocal"))
  

    return (
        <>
            <h1>heheh</h1>
            <h2>{filmLocal[0]}</h2>
            <h3>{filmLocal[1]}</h3>
            {filmLocal[2].map((item, index) => (
                <Link to="choicePlaces" key={index}>
                    <button
                        onClick={() => {
                            clickOnTime(item)
                        }}
                    >
                        {item}
                    </button>
                </Link>
            ))}
        </>
    )
}

export default Film
