import './Main.css'
import Logo from '../Logo/Logo'
import Button from '../Button/Button'
import Calendar from '../Calendar/Calendar'
import Card from '../Card/Card'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useStore from '../../store'
import { ClimbingBoxLoader } from "react-spinners";
import Loading from '../Loading/Loading'

function Main() {

    const navigate = useNavigate();
    const { loading, fetchAllData } = useStore();

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);  
 
    if (loading) {
        return (
       <Loading />
        ) 
    }

  return (
    <div className='container'>
        <div className='header__nav'> 
            <Logo />
            <Button onClick={() => navigate('/authorization', { replace: true })}/>
        </div>
        <Calendar />
        <div className='films'>
            <Card 
            />
        </div>
    </div>
  )
}

export default Main