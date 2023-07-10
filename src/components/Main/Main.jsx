import axios from "axios"
import styles from "./Main.module.scss"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    setData,
    setIndexOfDate,
    setNameFilm,
    setDateFilm,
    setTimeFilm,
    setImageFilm,
} from "../../store/dataSlices"
import { Link } from "react-router-dom"

function Main() {
    const allFilms = useSelector((state) => state.dataOfFilms.allFilms)
    const dispatch = useDispatch()

    // получаю все фильмы
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/films")
                dispatch(setData(response.data))
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])

    const clickOnDate = (event) => {
        const date = event.target.textContent
        // let idDate = 0

        // перебираем все фильмы из состояния date
        allFilms.forEach((item) => {
            // if(item.id !== 1) {
            // Определяем индекс даты на которую нажал пользователь
            const index = item.dates.indexOf(date)

            if (index !== -1) {
                let indexDate = 0
                indexDate = index

                // устанавливаю в хранилище название дату и время фильма(массив доступных времен) которые выбрал пользователь
                // и идекс даты
                dispatch(setImageFilm(item.img))
                dispatch(setNameFilm(item.name))
                dispatch(setDateFilm(date))
                dispatch(setTimeFilm(item.time[indexDate]))
                dispatch(setIndexOfDate(indexDate))
            }
        })
    }

    return (
        <div className={styles.container}>
            {allFilms &&
                allFilms.map((item, index) => {
                    return (
                        <div className={styles.item} key={index}>
                            <img src={item.img} alt="" />

                            <div className={styles.secondPart}>
                                <h2>{item.name}</h2>
                                {item.dates &&
                                    item.dates.map((el, index) => (
                                        <div
                                            className={styles.containerBtn}
                                            key={index}
                                        >
                                            <Link to="film">
                                                <button
                                                    onClick={(event) =>
                                                        clickOnDate(event)
                                                    }
                                                >
                                                    {el}
                                                </button>
                                            </Link>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )
                })}
        </div>
    )
}

export default Main
