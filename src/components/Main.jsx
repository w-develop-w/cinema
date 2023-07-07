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
} from "../store/dataSlices"
import { Link } from "react-router-dom"

function Main() {
    const data = useSelector((state) => state.dataOfFilms.data)
    const dispatch = useDispatch()

    // получаю все фильмы 
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


    const clickOnDate = (event) => {
        const date = event.target.textContent
        // let idDate = 0
        
        // перебираем все фильмы из состояния date 
        data.forEach((item) => {
            if(item.id !== 1) {
                // Определяем индекс даты на которую нажал пользователь 
                const index = item.dates.indexOf(date)
                
                if (index !== -1) {
                    let indexDate  = 0
                    indexDate = index
    
                    // устанавливаю в хранилище название дату и время фильма которые выбрал пользователь
                    // и идекс даты 
                    dispatch(setNameFilm(item.name))
                    dispatch(setDateFilm(date))
                    dispatch(setTimeFilm(item.time[indexDate]))
                    dispatch(setIndexOfDate(indexDate))
    
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
                            // это массив из времени
                            item.time[indexDate],
                            item.img,
                        ])
                    )
                }
            }
            
        })

    }


    return (
        <div className={styles.container}>
            {data && data.map((item, index) => {
                if (item.id !== 1) {
                    return (
                        <div className={styles.item} key={index}>
                            <img src={item.img} alt="" />
    
                            <div className={styles.secondPart}>
                                <h2>{item.name}</h2>
                                {item.dates && item.dates.map((el, index) => (
                                    <div className={styles.containerBtn} key={index}>
                                        <Link to="film">
                                            <button onClick={(event) => clickOnDate(event)}>
                                                {el}
                                            </button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
    
}

export default Main
