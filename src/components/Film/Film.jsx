import { useDispatch, useSelector } from "react-redux"
import {
    setIndexTimeFilm,
    setPlacesFilm,
    setCurrentTimeFilm,
} from "../../store/dataSlices"
import styles from "./Film.module.scss"
import { Link } from "react-router-dom"

function Film() {
    const data = useSelector((state) => state.dataOfFilms)
    const dispatch = useDispatch()

    const clickOnTime = (item, event) => {
        dispatch(setCurrentTimeFilm(event.target.textContent))

        const indexTime = data.timeFilm.indexOf(item)

        dispatch(setIndexTimeFilm(indexTime))

        data.allFilms &&
            data.allFilms.map((item) => {
                if (item.name === data.nameFilm) {
                    dispatch(
                        setPlacesFilm(item.places[data.indexOfDate][indexTime])
                    )
                }
            })
    }

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <img src={data.imageFilm}></img>
            </div>

            <div className={`${styles.item} ${styles.secondItem}`}>
                <h2>{data.nameFilm}</h2>
                <h3>{data.dateFilm}</h3>

                <div className={styles.containerBtn}>
                    {data.timeFilm &&
                        data.timeFilm.map((item, index) => (
                            <Link to="choicePlaces" key={index}>
                                <button
                                    onClick={(event) => {
                                        clickOnTime(item, event)
                                    }}
                                >
                                    {item}
                                </button>
                            </Link>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Film
