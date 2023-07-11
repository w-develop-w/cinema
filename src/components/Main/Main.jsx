import axios from "axios"
import styles from "./Main.module.scss"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    setAllFilms,
    setIndexOfDate,
    setImageFilm,
    setNameFilm,
    setDateFilm,
    setTimeFilm,
} from "../../store/dataSlices"
import { Link } from "react-router-dom"

function Main() {
    const allFilms = useSelector((state) => state.dataOfFilms.allFilms);
    const dispatch = useDispatch();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:3001/films");
          dispatch(setAllFilms(response.data));
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, []);
  
    const clickOnDate = (event, index) => {
      const date = event.target.textContent;
      const film = allFilms[index];
  
      if (film) {
        const indexDate = film.dates.indexOf(date);
  
        if (indexDate !== -1) {
          dispatch(setImageFilm(film.img));
          dispatch(setNameFilm(film.name));
          dispatch(setDateFilm(date));
          dispatch(setTimeFilm(film.time[indexDate]));
          dispatch(setIndexOfDate(indexDate));
        }
      }
    };
  
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
                    item.dates.map((el, innerIndex) => (
                      <div className={styles.containerBtn} key={innerIndex}>
                        <Link to="film">
                          <button
                            onClick={(event) => clickOnDate(event, index)}
                          >
                            {el}
                          </button>
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
      </div>
    );
  }
  
  export default Main;
  
