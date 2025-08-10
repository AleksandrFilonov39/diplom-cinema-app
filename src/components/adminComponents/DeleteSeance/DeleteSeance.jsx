import AdminButton from '../AdminButton/AdminButton'
import CencelButton from '../CencelButton/CencelButton'
import './DeleteSeance.css'


function DeleteSeance({deleteFilmData, deleteSeance, closeDelete}) {


    if (!deleteFilmData) {
        return <h1>Loading...</h1>
    }

  return (
    <div className='wrp-deleteFilm'>
        <div className='title-btn'>
            <h2>Вы действительно хотите удалить "{deleteFilmData.filmName}" время сеанса: {deleteFilmData.seanceTime}</h2>
            <div className='wrp-btn-del-seance'>
             <AdminButton 
                title={'удалить сеанс'}
                handleClick={deleteSeance}
             />
              <CencelButton 
                title={'отменить'} 
                onClick={closeDelete}
              />
            </div>
        </div>
    </div>
  ) 
} 

export default DeleteSeance