import './App.css'
import AddFilm from './components/adminComponents/AddFilm/AddFilm'
import AddSeance from './components/adminComponents/AddSeance/AddSeance'
import FormAddHall from './components/adminComponents/FormAddHall/FormAddHall'
import MainAdminPage from './components/adminComponents/mainAdminPage/mainAdminPage'
import Authorization from './components/Authorization/Authorization'
import BuyTickets from './components/BuyTickets/BuyTickets'
import ChooseSeats from './components/ChooseSeats/ChooseSeats'
import Main from './components/Main/Main'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Tickets from './components/Tickets/Tickets'
import Error404 from './components/Error404/Error404'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

function App() {
  

  return (
    <>
      <Router>
        <div>
            <Routes>
              <Route path='/' element={<Main />}/>
              <Route path='/hallconfig/:id/:dateSeance' element={<ChooseSeats/>}/>
              <Route path='/authorization' element={<Authorization/>}/>
              <Route path='/adminPage' element={
                <ProtectedRoute>
                  <MainAdminPage/>
                </ProtectedRoute>
              }/>
              <Route path='/addHall' element={
                <ProtectedRoute>
                  <FormAddHall/>
                </ProtectedRoute>
                }/>
              <Route path='/addFilm' element={
                <ProtectedRoute>
                  <AddFilm/>
                </ProtectedRoute>
                }/>
              <Route path='/addSeance/:hallId/:filmId' element={
                <ProtectedRoute>
                  <AddSeance/>
                </ProtectedRoute>
                }/>
              <Route path='/buyTickets' element={<BuyTickets/>}/>
              <Route path='/tickets' element={<Tickets/>}/>
              <Route path='*' element={<Error404/>} /> 
            </Routes> 
        </div>
      </Router>
    </>    
  )
}

export default App
