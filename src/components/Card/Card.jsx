import { useState } from 'react';
import CardHall from '../CardHall/CardHall'
import './Card.css'
import useStore from '../../store'

function Card() {

    const [fullDescription, setFullDescription] = useState({})
    const { allData } = useStore();

    if(!allData) {
        return;
    }

    const seances = allData.result.seances;
    const halls = allData.result.halls;
    const films = allData.result.films;

     const toggleDescription = (filmId) => {
        setFullDescription(prev => ({
            ...prev,
            [filmId]: !prev[filmId]
        }));
    };

  return ( 
    <>
        {films.map((film) => {
            const filmSeance = seances.filter((el) => el.seance_filmid === film.id)
            let descript = '';
            if(film.film_description.length > 1000) {
                descript = `${film.film_description.slice(0, 1000)} ... (для полного оаисания нажмите на текст)`
            }else {
                descript = film.film_description
            }

            if(fullDescription[film.id]) {
                descript = film.film_description
            }

            return (
            <div key={film.id} className='film-card'>
                <div className='film-side'>
                    <img src={film.film_poster} alt="film_poster" className='film-poster'/>
                    <div className='film-all-discription'>
                        <h1 className='film-name'>{film.film_name}</h1>
                        <h2 className='film-discription' onClick={() => toggleDescription(film.id)}>{descript}</h2>
                        <h2 className='film-duration'>{film.film_duration} минут {film.film_origin}</h2>
                    </div>
                </div>
                <CardHall  
                 filmSeance = {filmSeance} 
                 halls= {halls}
                 />
            </div>
        )})}
    </>
  )
}

export default Card