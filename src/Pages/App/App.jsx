import './App.css'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import NewOrderPage from "../NewOrderPage/NewOrderPage.jsx"
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage'
import AuthPage from "../AuthPage/AuthPage.jsx"
import NavBar from "../../components/NavBar/NavBar"
import { getUser } from '../../utilities/users-service'
import NutritionPage from "../NutritionPage/NutritionPage"
import HomePage from '../HomePage/HomePage'
import CocktailPage from '../CocktailPage/CocktailPage'


function App() {
  const [user, setUser] = useState(getUser())
 


  return (
    <main className="App">
      {
        user ?
          <>
          <h1>THE FITNESS APP</h1>
            {/* NavBar and Routes are only available when the user is logged in */}
            <NavBar user={user} setUser={setUser} />
            <Routes>
              <Route path="/exerciseinstructions" element={<NewOrderPage />} />
              <Route path="/caloriesburned" element={<OrderHistoryPage />} />
              <Route path="/nutrition" element={<NutritionPage />} />
              <Route path="/cocktail" element={<CocktailPage />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
            
          </>
        :
          <AuthPage setUser={setUser} />
      }
    </main>
  )
}

export default App