import { useDispatch, useSelector } from "react-redux"
import { setAllFilms } from "../../store/dataSlices"
import styles from "./Places.module.scss"
import { useEffect, useState } from "react"
import axios from "axios"

export const updateData = async (idFilm, clickedItem) => {
    try {
        await axios.put(`http://localhost:3001/films/${idFilm}`, clickedItem)
    } catch (error) {
        console.error(error)
    }
}

function Places() {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.dataOfFilms)

    const [buttonClicked, setButtonClicked] = useState(false)

    // Получаем все фильмы сервера
    useEffect(() => {
        const fetchData = async () => {
            try {
                const allFilms = await axios.get("http://localhost:3001/films")

                dispatch(setAllFilms(allFilms.data))
                setButtonClicked(!buttonClicked)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [buttonClicked])

    // Проверяем наличие данных в allFilmsLocal
    if (!data.allFilms) {
        return <div>Loading...</div> // Отображаем загрузку или другой индикатор ожидания
    }

    const clickOnPlace = async (event, keys, values, idFilm) => {
        const textContentBtn = event.target.textContent
        const indexBtn = keys.indexOf(textContentBtn)

        const updatedValues = [...values]
        updatedValues[indexBtn] = !updatedValues[indexBtn]

        const objPlaces = keys.reduce((result, key, index) => {
            result[key] = updatedValues[index]
            return result
        }, {})

        if (data.allFilms) {
            await Promise.all(
                data.allFilms.map(async (item) => {
                    if (item.id === idFilm) {
                        let clickedItem = JSON.parse(JSON.stringify(item))
                        clickedItem.places[Number(data.indexOfDate)][
                            Number(data.indexTimeFilm)
                        ] = objPlaces

                        await updateData(idFilm, clickedItem)
                    }
                })
            )

            setButtonClicked(true)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.containerBtn}>
                {data.allFilms.map((item) => {
                    const dateFilm = item.dates.includes(data.dateFilm)
                    const indexDateFilm = item.dates.indexOf(data.dateFilm)
                    const arrTimes = item.time[indexDateFilm]
                    const timeFilm = arrTimes.includes(data.currentTimeFilm)
                    const indexTimeFilm = arrTimes.indexOf(data.currentTimeFilm)

                    if (item.name === data.nameFilm && dateFilm && timeFilm) {
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
                                    onClick={(event) => {
                                        clickOnPlace(
                                            event,
                                            keys,
                                            values,
                                            idFilm
                                        )
                                    }}
                                >
                                    {item}
                                </button>
                            )
                        })
                    }
                })}
            </div>
        </div>
    )
}

export default Places
