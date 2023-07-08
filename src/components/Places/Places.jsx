import { useDispatch, useSelector } from "react-redux"
import { setPlacesFilm, setAllFilms } from "../../store/dataSlices"
import styles from "./Places.module.scss"
import { useEffect } from "react"
import axios from "axios"

// export const updateData = async (idFilm, clickedItem) => {
//     try {
//         await axios.post(
//             `https://6478d572362560649a2e842a.mockapi.io/${idFilm}`,
//             JSON.stringify(clickedItem)
//         )

//     } catch (error) {
//         console.error(error)
//     }
// }

export const deleteFilmFromMockAPi = async (idFilm) => {
    try {
        await axios.delete(
            `https://6478d572362560649a2e842a.mockapi.io/${idFilm}`
        )
    } catch (error) {
        console.error(error)
    }
}

function Places() {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.dataOfFilms)

    // ---------------------------------------------------------------------------------------------

    // Получаем все фильмы с mockApi
    useEffect(() => {
        const fetchData = async () => {
            try {
                const allFilms = await axios.get(
                    "http://localhost:3001/films"
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
    // console.log(infoForPlacesLocal)

    const allFilmsLocal = JSON.parse(localStorage.getItem("allFilmsLocal"))

    // console.log(allFilmsLocal)

    // Проверяем наличие данных в allFilmsLocal
    if (!allFilmsLocal) {
        return <div>Loading...</div> // Отображаем загрузку или другой индикатор ожидания
    }

    // const clickOnPlace = (event, keys, values, idFilm) => {
    //     // console.log(Number(data.indexOfDate))
    //     // console.log(Number(data.indexTimeFilm))

    //     // определяю число на кнопке
    //     const textContentBtn = event.target.textContent
    //     // console.log(textContentBtn)
    //     // опрелделяю индекс числа в массиве ключей
    //     const indexBtn = keys.indexOf(textContentBtn)
    //     // console.log(indexBtn)
    //     // по данному индексу меняю значение на противоположное в массиве values
    //     values[indexBtn] = !values[indexBtn]
    //     // console.log(values[indexBtn])

    //     // objPlaces - объединенный объект из ключей и значений
    //     const objPlaces = keys.reduce((result, key, index) => {
    //         result[key] = values[index]
    //         return result
    //     }, {})

    //     // console.log(objPlaces)

    //     const allFilmsLocal = JSON.parse(localStorage.getItem("allFilmsLocal"))
    //     // console.log(allFilmsLocal)

    //     if (allFilmsLocal) {
    //         allFilmsLocal.map((item) => {
    //             // находим объект фильма который пользователь выбрал
    //             if ((item.id = idFilm)) {
    //                 let clickedItem = item
    //                 // меняем в данном объекте фильма в places соответствующий объект на измененный объект
    //                 clickedItem.places[Number(data.indexOfDate)][
    //                     Number(data.indexTimeFilm)
    //                 ] = objPlaces
    //                 console.log(clickedItem)
    //                 updateData(idFilm,clickedItem)
    //             }
    //         })
    //     }

    //     // id фильма
    //     console.log(`idFilm: ${idFilm}`)

    // }

    const clickOnPlace = (data) => {

        // название фильма, который выбрал пользователь
        // infoForPlacesLocal[0]

        // const nameFilm = infoForPlacesLocal[0]
        if(data) {
            data.allFilms.map(item => {
                if(item.name === infoForPlacesLocal[0]) {
                    let idFilm = Number(item.id)
                    deleteFilmFromMockAPi(Number(idFilm))
                }
            })
        }

    }

    return (
        <div className={styles.container}>
            <div className={styles.containerBtn}>
                {allFilmsLocal.map((item) => {
                    // if (item.id !== 1) {
                        const dateFilm = item.dates.includes(
                            infoForPlacesLocal[1]
                        )
                        const indexDateFilm = item.dates.indexOf(
                            infoForPlacesLocal[1]
                        )
                        const arrTimes = item.time[indexDateFilm]
                        const timeFilm = arrTimes.includes(
                            infoForPlacesLocal[2]
                        )
                        const indexTimeFilm = arrTimes.indexOf(
                            infoForPlacesLocal[2]
                        )

                        if (
                            item.name === infoForPlacesLocal[0] &&
                            dateFilm &&
                            timeFilm
                        ) {
                            const idFilm = Number(item.id)
                            const keys = Object.keys(
                                item.places[indexDateFilm][indexTimeFilm]
                            )
                            const values = Object.values(
                                item.places[indexDateFilm][indexTimeFilm]
                            )

                            return keys.map((item, index) => {
                                const indexOfItem = keys.indexOf(item)
                                const colorBtn = values[indexOfItem]
                                    ? "green"
                                    : "red"

                                return (
                                    <button
                                        key={index}
                                        className={`${styles.button} ${styles[colorBtn]}`}
                                        onClick={() => {
                                            clickOnPlace(
                                                data
                                                // event,
                                                // keys,
                                                // values,
                                                // idFilm
                                            )
                                        }}
                                    >
                                        {item}
                                    </button>
                                )
                            })
                        }
                    // }
                })}
            </div>
        </div>
    )
}

export default Places
