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
                {allFilmsLocal.map((item) => {
                    // if (
                    //     item.name === infoForPlacesLocal[0] &&
                    //     item.dates.includes(infoForPlacesLocal[1]) &&
                    //     item.time.includes(infoForPlacesLocal[2])
                    // ) {

                        return <h1>Well!</h1>
                        // const indexOfDate = item.dates.indexOf(infoForPlacesLocal[1])
                        // const indexOfTime = item.time.indexOf(infoForPlacesLocal[2])

                        // console.log(item.places[indexOfDate][indexOfTime])
                    // }
                })}
            </div>
        </div>
    )
}

export default Places
