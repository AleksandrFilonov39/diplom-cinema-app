import { useState } from 'react';
import './DropHall.css'


function DropHall({data, id, onDrop, onDropOutside, colors}) {
  
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  }

  const handleDragLeave = () => {
    setIsDraggingOver(false); 
  }

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    onDrop(id); 
  }

  return (
      <div
       className='wrp-seances'
       onDragOver={handleDragOver}
       onDragLeave={handleDragLeave}
       onDrop={handleDrop} 
       >
            {data.result.seances
            .filter((el) => el.seance_hallid === id)
            .sort((a, b) => a.seance_time.localeCompare(b.seance_time))
            .map((seance) => {
            const [filmName] = data.result.films.filter((film) => film.id === seance.seance_filmid);
             return (
            <div 
            key={seance.id} 
            style={{background: colors[seance.seance_filmid]}}
            className='wrp-seances-film'
            draggable='true'
            onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', seance.id);
              }}
            onDragEnd={() => onDropOutside(seance.id, filmName.film_name, seance.seance_time)}
            >
              <p className='film-name-seance'>{filmName.film_name}</p>
              <p className='film-time-seance'>{seance.seance_time}</p>
            </div>
            ) 
            })}
    </div>
  )
}

export default DropHall
