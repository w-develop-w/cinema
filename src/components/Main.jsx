import axios from "axios"
import styles from "./Main.module.scss"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    setData,
    setIndexOfDate,
    setIdOfDate,
    setNameFilm,
    setDateFilm,
    setTimeFilm,
} from "../store/dataSlices"
import { Link } from "react-router-dom"

function Main() {
    const data = useSelector((state) => state.dataOfFilms.data)
    const indexOfDate = useSelector((state) => state.dataOfFilms.indexOfDate)
    const idOfDate = useSelector((state) => state.dataOfFilms.idOfDate)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://6478d572362560649a2e842a.mockapi.io/cinema"
                )
                dispatch(setData(response.data))
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])

    // useEffect(() => {
    //     console.log(data)
    // }, [data])

    const clickOnDate = (event) => {
        const date = event.target.textContent
        let indexDate = 0
        let idDate = 0

        data.forEach((item) => {
            const index = item.dates.indexOf(date)
            if (index !== -1) {
                indexDate = index
                idDate = item.id

                dispatch(setNameFilm(item.name))
                dispatch(setDateFilm(date))
                dispatch(setTimeFilm(item.time[indexDate]))

                localStorage.setItem(
                    "filmLocal",
                    // устанавливаю инфу о фильме
                    // название --- дату --- доступное время --- картинку
                    // вот  почему использую  indexDate в item.time[indexDate] ---  
                    // "dates": ["04.07.2023", "05.07.2023"],
                    // "time": [
                    //     ["13:00", "16:00", "19:00"],
                    //     ["12:00", "15:00", "18:00"]
                    // ]
                    
                    JSON.stringify([
                        item.name,
                        date,
                        item.time[indexDate],
                        item.img,
                    ])
                )
            }
        })

        dispatch(setIndexOfDate(indexDate))
    }

    // const filmLocal = JSON.parse(localStorage.getItem("filmLocal"))
    // console.log(filmLocal)

    return (
        <div className={styles.container}>
            {data.map((item, index) => (
                <div className={styles.item} key={index}>
                    <img src={item.img}></img>

                    <div className={styles.secondPart}>
                        <h2>{item.name}</h2>
                        {item.dates.map((el, index) => (
                            <div className={styles.containerBtn} key={index}>
                                <Link to="film">
                                    <button
                                        onClick={(event) => clickOnDate(event)}
                                    >
                                        {el}
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Main
