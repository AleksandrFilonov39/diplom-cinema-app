import { useEffect, useState } from 'react';
import './BuyTickets.css'
import { useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import AdminButton from '../adminComponents/AdminButton/AdminButton';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store';


function BuyTickets() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const { state } = location;
  const navigate = useNavigate();
  const { updateTicketsDataQR } = useStore();

useEffect(() => {
    setData([...state.choosenSeats.map(el => ({row: el[0] + 1, place: el[1] + 1, coast: el[2]}))])
},[state])
  
  const handleClick = async () => {
    const params = new FormData()
    params.set('seanceId', state.id)
    params.set('ticketDate', state.date)
    params.set('tickets', JSON.stringify(data))

    const response = await fetch ('https://shfe-diplom.neto-server.ru/ticket', {
        method: 'POST',
        body: params
    })

    const data2 = await response.json();
    updateTicketsDataQR(data2)
    
    navigate('/tickets', { replace: true })
  }
        
  return (
    <div className='container-choose-seats'>

      <div className='header__nav'> 
          <Logo />
      </div>

      <div className='buy-ticket-title'> 
          <p>вы выбрали билеоы:</p>
      </div>

      <div className='buy-ticket-info'>
        <div>
          <div className='buy-ticket-film-info'>
             <p className='buy-ticket-film-about-atr'>На фильм:</p><p className='buy-ticket-film-about-value'>{state.filmName}</p>
          </div>
          <div className='buy-ticket-film-info'>
            <p className='buy-ticket-film-about-atr'>В зале:</p><p className='buy-ticket-film-about-value'>{state.hallName}</p>
          </div>
          <div className='buy-ticket-film-info'>
            <p className='buy-ticket-film-about-atr'>Начало сеанса:</p><p className='buy-ticket-film-about-value'>{state.seance}</p>
          </div>
          <div className='buy-ticket-film-info'>
            <p className='buy-ticket-film-about-atr'>Стоимость</p><p className='buy-ticket-film-about-value'>{data.reduce((acc, el) => {
              return acc + el.coast
          }, 0)}</p>
           <p className='buy-ticket-film-about-atr'>рублей</p>
          </div> 
        </div>
        <div className='buy-ticket-film-btn'>
          <AdminButton 
            css={'admin-button-large'}
            title={'Получить код бронирования'}
            handleClick={handleClick}
          />
        </div>
        <div>
          <p className='buy-ticket-film-last-info'>После оплаты билет будет доступен в этом окне, а
              также придёт вам на почту. Покажите QR-код нашему
              онтроллёру у входа в зал.
          </p>
          <p className='buy-ticket-film-last-info'>Приятного просмотра!</p>
        </div>
      </div>

    </div>    
  )
}

export default BuyTickets
