import { useDispatch, useSelector } from "react-redux"
import { setIndexTimeFilm, setPlacesFilm } from "../../store/dataSlices"
import styles from "./Film.module.scss"
import { Link } from "react-router-dom"

function Film() {
    const data = useSelector((state) => state.dataOfFilms)
    const dispatch = useDispatch()
    
    const clickOnTime = (item) => {
        // определяю индекс времени
        const indexTime = data.timeFilm.indexOf(item)

        dispatch(setIndexTimeFilm(indexTime))
     
        // пробигаюсь по всем объектам с фильмами
        data.allFilms && data.allFilms.map((item) => {
            // если фильм в объекте совпадает с тем на который нажал пользователь
            if (item.name === data.nameFilm) {
                // устанавливаем PlacesFilm - доступные места
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
                    {data.timeFilm && data.timeFilm.map((item, index) => (
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
                </div>
            </div>
        </div>
    )
}

export default Film

