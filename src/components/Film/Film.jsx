import { useDispatch, useSelector } from "react-redux"
import { setIndexTimeFilm, setPlacesFilm } from "../../store/dataSlices"
import styles from "./Film.module.scss"
import { Link } from "react-router-dom"

function Film() {
    const data = useSelector((state) => state.dataOfFilms)
    const dispatch = useDispatch()

    const clickOnTime = (item) => {
        const indexTime = data.timeFilm.indexOf(item)
        // console.log(indexTime)
        // dispatch(setIndexTimeFilm(indexTime))

        data.data.map((item) => {
            if (item.name === data.nameFilm) {
                // console.log(item.places[data.indexOfDate][indexTime])
                dispatch(
                    setPlacesFilm(item.places[data.indexOfDate][indexTime])
                )
            }
        })
    }

    return (
        <>
            <h2>{data.nameFilm}</h2>
            <h3>{data.dateFilm}</h3>
            {data.timeFilm.map((item, index) => (
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
