import Logo from '../../Logo/Logo'
import AddHall from '../AddHall/AddHall'
import ConfigHall from '../ConfigHall/ConfigHall'
import Header from '../Header/Header'
import { useEffect, useState } from 'react'
import './MainAdminPage.css'
import ChangePrice from '../ChangePrice/ChangePrice'
import SeanceList from '../SeanceList/SeanceList'
import OpenSales from '../OpenSales/OpenSales'
import AdminButton from '../AdminButton/AdminButton'
import { useNavigate } from 'react-router-dom'
import useStore from '../../../store'

function MainAdminPage() {

  const [showContent, setShowContent] = useState({
    addHall: true,
    configHall: true,
    changePrice: true,
    openSales: true,
    seanceList: true
  });
  const { fetchAllData ,allData } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllData()
  },[fetchAllData])

    function hideOption (value) {
        setShowContent(prev => ({...prev, ...value}))
    }

    const deleteDAtaFromLocalStorage = () => {
        localStorage.clear();
        navigate('/', { replace: true });
    }


    if (!allData) {
        return (
            <h1>Loading...</h1>
        )
    }

  return (
    <div className='wrp-auth-main'>
        <div className='wrp-info-main'>
            <div className='wrp-logo-main'>
                <div>
                <Logo />
                <h2 className='auth-adm'>Администраторррская</h2>
                </div>
                <AdminButton 
                    title={'выйти'}
                    handleClick={deleteDAtaFromLocalStorage}
                />
            </div>

            <div className="admin-section">
                <Header 
                    title={'Управление залами'}
                    after={'header-text-after'}
                    css={'header-text'}
                    sectionName="addHall"
                    show={showContent.addHall}
                    onClick={hideOption}
                />
                <div className={`section-content ${showContent.addHall ? 'open' : 'closed'}`}>
                    <AddHall />
                </div>
            </div>

            <div className="admin-section">
                <Header 
                    title={'конфигурация залов'}
                    after={'header-text-after'}
                    css={'header-text'}
                    sectionName="configHall"
                    show={showContent.configHall}
                    onClick={hideOption}
                />
                <div className={`section-content ${showContent.configHall ? 'open' : 'closed'}`}>
                    <ConfigHall allData={allData}/>
                </div>
            </div>

            <div className="admin-section">
            <Header 
                title={'конфигурация цен'}
                after={'header-text-after'}
                css={'header-text'}
                sectionName="changePrice"
                show={showContent.changePrice}
                onClick={hideOption}
            />
            <div className={`section-content ${showContent.changePrice ? 'open' : 'closed'}`}>
                <ChangePrice allData={allData}/>
            </div>
        </div>

            <div className="admin-section">
            <Header 
                title={'Сетка сеансов'}
                after={'header-text-after'}
                css={'header-text'}
                sectionName="seanceList"
                show={showContent.seanceList}
                onClick={hideOption}
            />
            <div className={`section-content ${showContent.seanceList ? 'open' : 'closed'}`}>
                <SeanceList allData={allData}/>
                </div>
            </div>

            <div className="admin-section">
            <Header 
                title={'открыть продажи'}
                after={'header-text-after'}
                css={'header-text'}
                sectionName="openSales"
                show={showContent.openSales}
                onClick={hideOption}
            />
            <div className={`section-content ${showContent.openSales ? 'open' : 'closed'}`}>
                <OpenSales allData={allData}/>
                </div>
            </div>
        </div> 
    </div>
  ) 
}

export default MainAdminPage