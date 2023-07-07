import { useDispatch, useSelector } from "react-redux"
import { setIndexTimeFilm, setPlacesFilm } from "../../store/dataSlices"
import styles from "./Film.module.scss"
import { Link } from "react-router-dom"

function Film() {
    const data = useSelector((state) => state.dataOfFilms)
    const dispatch = useDispatch()

    const filmLocal = JSON.parse(localStorage.getItem("filmLocal"))


    const clickOnTime = (item) => {
        // определяю индекс времени
        const indexTime = data.timeFilm.indexOf(item)

        dispatch(setIndexTimeFilm(indexTime))

        // console.log(filmLocal[2][indexTime])

        // устанавливаю в локальное хранилище название фильма, дату фильма, массив с временами
        localStorage.setItem('infoForPlacesLocal', JSON.stringify([filmLocal[0], filmLocal[1], filmLocal[2][indexTime]]))

        // пробигаюсь по всем объектам с фильмами
        data.data && data.data.map((item) => {
            // если фильм в объекте совпадает с тем на который нажал пользователь
            if (item.name === data.nameFilm) {
                // устанавливаем PlacesFilm - доступные места
                dispatch(
                    setPlacesFilm(item.places[data.indexOfDate][indexTime])
                )
                // закинули доступные места в локалку
                localStorage.setItem(
                        "placesLocal",
                    JSON.stringify(item.places[data.indexOfDate][indexTime])
                )
            }
        })

    }

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <img src={filmLocal[3]}></img>
            </div>

            <div className={`${styles.item} ${styles.secondItem}`}>
                <h2>{filmLocal[0]}</h2>
                <h3>{filmLocal[1]}</h3>

                <div className={styles.containerBtn}>
                    {filmLocal && filmLocal[2].map((item, index) => (
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

