
import './AddHall.css'
import AdminButton from '../AdminButton/AdminButton';
import { useNavigate } from 'react-router-dom';
import useStore from '../../../store';


function AddHall() {
  
    const { allData, updateAllData } = useStore();
  
    const navigate = useNavigate(); 

    function navigateTo () {
        navigate('/addHall', { replace: true })
    }

    const deleteHall = async (id) => {
      try {
      const response = await fetch(`https://shfe-diplom.neto-server.ru/hall/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
                throw new Error('Ошибка удаления зала');
            }

        const data = await response.json();
          updateAllData(data) 
           

      } catch (e) {
        console.log(e)
      }
    }

    if (!allData?.result?.halls) {
        return <h1>Loading...</h1>
    }
 
  return (
    <div className='wrp-add-hall'>
        <h3 className='add-hall-title'>Доступные залы:</h3>
        {allData.result.halls.map((hall) => (
        <div key={hall.id} className='wrp-hall'>
            <h2>-</h2>
            <h2 className='hall-name'>{hall.hall_name}</h2>
            <button className='hall-delete' onClick={() => deleteHall(hall.id)}></button>
        </div>
    ))}
      <div className='wrp-add-hall-btn'>
        <AdminButton 
        title={'Создать зал'}
        handleClick={navigateTo}
        />
      </div>   
    </div>
  )
}

export default AddHall