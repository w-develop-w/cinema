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

    const clickOnPlace = (event, keys, values) => {
        // определяю число на кнопке
        const textContentBtn = event.target.textContent
        console.log(textContentBtn)
        // опрелделяю индекс числа в массиве ключей
        const indexBtn = keys.indexOf(textContentBtn)
        console.log(indexBtn)
        // по данному индексу меняю значение на противоположное в массиве values
        values[indexBtn] = !values[indexBtn]
        console.log(values[indexBtn])

        // objPlaces - объединенный объект из ключей и значений
        const objPlaces = keys.reduce((result, key, index) => {
            result[key] = values[index]
            return result
        }, {})

        console.log(objPlaces)

        const allFilmsLocal = JSON.parse(localStorage.getItem("allFilmsLocal"))
        // console.log(allFilmsLocal)

        if (allFilmsLocal) {
            allFilmsLocal.map((item) => {
                const indexDateFilm = item.dates.indexOf(infoForPlacesLocal[1])

                const arrTimes = item.time[indexDateFilm]
                const indexTimeFilm = arrTimes.indexOf(infoForPlacesLocal[2])

                if (
                    item.name === infoForPlacesLocal[0] &&
                    item.dates.includes(infoForPlacesLocal[1]) &&
                    item.time[indexDateFilm].includes(infoForPlacesLocal[2])
                ) {
                    // корректируем allFilmsLocal - меняем в нем старый объект
                    // на новый - с обновленной информацие о местах
                    item.places[indexDateFilm][indexTimeFilm] = objPlaces
                }
                return item
            })

            console.log(allFilmsLocal)

            useEffect(() => {
                const updateData = async () => {
                  try {
    
            
                    await axios.put(
                      "https://6478d572362560649a2e842a.mockapi.io/cinema",
                      allFilmsLocal
                    );
            
                    // Дополнительный код после успешного обновления данных
                  } catch (error) {
                    console.error(error);
                  }
                };
            
                updateData();
              }, []);
            
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.containerBtn}>
                {allFilmsLocal.map((item) => {
                    const dateFilm = item.dates.includes(infoForPlacesLocal[1])
                    const indexDateFilm = item.dates.indexOf(
                        infoForPlacesLocal[1]
                    )

                    const arrTimes = item.time[indexDateFilm]
                    const timeFilm = arrTimes.includes(infoForPlacesLocal[2])
                    const indexTimeFilm = arrTimes.indexOf(
                        infoForPlacesLocal[2]
                    )

                    if (
                        item.name === infoForPlacesLocal[0] &&
                        dateFilm &&
                        timeFilm
                    ) {
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
                                        clickOnPlace(event, keys, values)
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
