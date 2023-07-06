import { useDispatch, useSelector } from "react-redux"
import { setPlacesFilm, setAllFilms } from "../../store/dataSlices"
import styles from "./Places.module.scss"
import { useEffect } from "react"
import axios from "axios"

function Places() {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.dataOfFilms)

    // ---------------------------------------------------------------------------------------------

    // Получаем все фильмы с mockApi
    useEffect(() => {
        const fetchData = async () => {
            try {
                const allFilms = await axios.get(
                    "https://6478d572362560649a2e842a.mockapi.io/cinema"
                )
                localStorage.setItem(
                    "allFilmsLocal",
                    JSON.stringify(allFilms.data)
                )
                dispatch(setAllFilms(allFilms.data)) // Сохраняем все фильмы в состоянии
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])

    // инфа которую выбрал пользователь
    // название - дата - время
    // infoForPlacesLocal[0] - infoForPlacesLocal[1] - infoForPlacesLocal[2]

    const infoForPlacesLocal = JSON.parse(
        localStorage.getItem("infoForPlacesLocal")
    )
    console.log(infoForPlacesLocal)

    const allFilmsLocal = JSON.parse(localStorage.getItem("allFilmsLocal"))

    console.log(allFilmsLocal)

    // Проверяем наличие данных в allFilmsLocal
    if (!allFilmsLocal) {
        return <div>Loading...</div> // Отображаем загрузку или другой индикатор ожидания
    }

    return (
        <div className={styles.container}>
            <div className={styles.containerBtn}>
                {allFilmsLocal.map((item, index) => {
                    // true/false
                    const dateFilm = item.dates.includes(infoForPlacesLocal[1])
                    const indexDateFilm = item.dates.indexOf(
                        infoForPlacesLocal[1]
                    )

                    const arrTimes = item.time[indexDateFilm]
                    // true/false
                    const timeFilm = arrTimes.includes(infoForPlacesLocal[2])
                    const indexTimeFilm = arrTimes.indexOf(
                        infoForPlacesLocal[2]
                    )

                    if (
                        item.name === infoForPlacesLocal[0] &&
                        dateFilm &&
                        timeFilm
                    ) {
                        // return <h1 key={index}>Well!</h1>

                        const keys = Object.keys(
                            item.places[indexDateFilm][indexTimeFilm]
                        )
                        console.log(keys)
                        // const values = Object.values(item.places[indexDateFilm][indexTimeFilm])

                        return keys.map((item, index) => <button key={index}>{item}</button>);
                    }
                })}
            </div>
        </div>
    )
}

export default Places
