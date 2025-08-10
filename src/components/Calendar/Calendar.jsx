import { useEffect, useState } from 'react'
import Slider from "react-slick";
import useStore from '../../store';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Calendar.css'

function Calendar() {
 
    const [date, setDate] = useState();
    const { updateSelectedDate } = useStore();

    useEffect(() => {
      function formatDate() {
        const date = new Date()
        const year = date.getFullYear();
        const month2 = date.getMonth();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const day2 = date.getDate()

        const dayOfMonth = date.getDate();
        const dayOfWeekIndex = date.getDay();

        const daysOfWeek = ['Вс','Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

        const dayOfWeekName = daysOfWeek[dayOfWeekIndex];

        const daysInMonth = new Date(year, month2 + 1, 0).getDate();
        const allDaysCurrent = [];
        for (let day = day2; day <= daysInMonth; day++) {
            const date = new Date(year, month2, day);
            allDaysCurrent.push([day, daysOfWeek[date.getDay()], month2]);
        }

        const daysInNextMonth = new Date(year, month2 + 1, 0).getDate();
        for (let day = 1; day <= daysInNextMonth; day++) {
            const date = new Date(year, month2 + 1, day);
            allDaysCurrent.push([day, daysOfWeek[date.getDay()], month2 + 1]);
        }

        const formattedDate = `${year}-${month}-${day}`;
        setDate({date: formattedDate, dayOfMonth: dayOfMonth, dayOfWeekName: dayOfWeekName, daysToShow: allDaysCurrent, activeElement: 0})
        updateSelectedDate(formattedDate)
      }

      formatDate();
    },[]);
    


    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 7,
      arrows: false
    };

    const chengeActive = (e, index, day, month) => {
      e.preventDefault();
      const newDate = `${new Date().getFullYear()}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      setDate(prev => ({ ...prev, date: newDate, activeElement: index}))
      if(date){
          updateSelectedDate(newDate);
        }
    }

    if(!date) {
      return <h1>Loading...</h1>
    }
  
  return ( 
    <Slider {...settings}  className='wrp-carusel'>
      {date.daysToShow.slice(0, 14).map((day, index) => {
        const isToday = day[0] === date.dayOfMonth && day[1] === date.dayOfWeekName;
        const isWeecand = day[1] === 'Вс' || day[1] === 'Сб';
        const active = index === date.activeElement;
              return (
                <div key={`${day[0]}-${day[1]}-${index}`} className='calendaer__list'>
                  <a className={`calendaer__link ${isToday ? 'today' : ''} ${isWeecand ? 'weecand' : ''} ${active ? 'active' : ''}`} onClick={(e) => chengeActive(e, index, day[0], day[2])}>
                    {isToday ? `Сегодня ${day[0]}, ${day[1]}` : `${day[0]},\n${day[1]}`}
                  </a>
                </div>
              ); 
      })}
    </Slider>
  )
}

export default Calendar