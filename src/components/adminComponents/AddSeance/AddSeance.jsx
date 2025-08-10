import './AddSeance.css'
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import AdminButton from '../AdminButton/AdminButton'
import CencelButton from '../CencelButton/CencelButton'
import { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import Logo from '../../Logo/Logo';


function AddSeance() {

    const [allData, setAllData] = useState();
    const [loading, setLoading] = useState(true);
    const [selectedHall, setSelectedHall] = useState();
    const [selectedFilm, setSelectedFilm] = useState();
    const [time, setTime] = useState();
    const [error, setError] = useState('Введите время');

    const navigate = useNavigate();
    const { hallId, filmId } = useParams();

    useEffect(() => {
            async function fetchData() {
                try {
                    const response = await fetch('https://shfe-diplom.neto-server.ru/alldata');
                    const data = await response.json();
                    setAllData(data)
                    setLoading(false)
                    setSelectedHall(hallId)
                    setSelectedFilm(filmId)
                } catch (error) {
                    console.error('Ошибка при получении данных:', error);
                }
            }
            fetchData();
            
        },[filmId, hallId]);

    function navigateTo () {
        navigate('/adminPage', { replace: true })
    }

    function handleChange (e) {
        e.preventDefault();
        const value = e.target.value;
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(value)) {
        setError('Пожалуйста, введите время в формате HH:MM (например, 09:30)');
        } else {
        setTime(value);
        }
    }


    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }

    const [hallName] = allData.result.halls.filter((hall) => hall.id === Number(hallId))
    const [filmName] = allData.result.films.filter((film) => film.id === Number(filmId))
    console.log(filmName, 'filmName')

    const handleClick = async (e) => {
        e.preventDefault();

        if(!selectedHall || !selectedFilm || !time) {
            alert('Некоторые поля не заполнены')
            return;
        }

        const params = new FormData()
        params.set('seanceHallid', selectedHall)
        params.set('seanceFilmid', selectedFilm)
        params.set('seanceTime', time)

        const filmTimeArr = time.split(':').map(part => part.padStart(2, '0')).map(el => Number(el));
        const filmTimeMinutes = filmTimeArr[0]*60 + filmTimeArr[1];
        if(filmTimeMinutes + filmName.film_duration > 1439) {
            alert('Некорректное время сеанса')
            return;
        }

        try {
        const response = await fetch('https://shfe-diplom.neto-server.ru/seance', {
            method: 'POST',
            body: params
        })
        if (!response.ok) {
                throw new Error('Ошибка авторизации');
            }

        const data = await response.json();
        if(!data.success) {
             alert(data.error)
        }
        console.log(data)
        }catch(e) {
            console.log(e)
        }
        navigate('/adminPage', { replace: true })
    }
  
  return (
    <div className='wrp-auth'>
        <div className='wrp-addHall-form'>
                <div className='wrp-logo-addHall'>
                  <Logo />
                  <h2 className='auth-adm'>Администраторррская</h2>
                </div>
        <Header 
          title={'Добавление сеанса'}
          after={'header-text-after-close'}
          css={'header-text-forAddHallForm'}
          onClick={navigateTo}
        />

        <form className='wrp-form-addHall'>

         <label htmlFor="hallName">Название зала</label>
         <select 
            className='form-addHall-input'
            value={selectedHall}
            onChange={(e) => setSelectedHall(e.target.value)}
        >
            <option value={hallId}>{hallName.hall_name}</option>
            {allData.result.halls
            .filter((el) => el.id !== Number(hallId))
            .map((ele) => (
                <option key={ele.id} value={ele.id}>
                    {ele.hall_name}
                </option>
            ))}
            
        </select>

        <select 
            className='form-addHall-input'
            value={selectedFilm}
            onChange={(e) => setSelectedFilm(e.target.value)}
        >
            <option value={filmId}>{filmName.film_name}</option>
            {allData.result.films
            .filter((el) => el.id !== Number(filmId))
            .map((ele) => (
                <option key={ele.id} value={ele.id}>
                    {ele.film_name}
                </option>
            ))}
            
        </select>

        <label htmlFor="time">Время начала</label>
        <input type="text" name='time' id='time' placeholder={error} onChange={handleChange} className='form-addHall-input'/>
        <div className='wrp-addFilm-btns'>
            <AdminButton 
            title={'добавить фильм'}
            handleClick={(e) => handleClick(e)}
            />      
            <CencelButton
            title={'отменить'}
            onClick={navigateTo}
            />
        </div>
      </form>
     </div>
    </div>    
  )
}

export default AddSeance


