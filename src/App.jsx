import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import MiApi from './components/MiApi'
import Buscador from './components/Buscador';

const App = () => {

  const [drinksList, setDrinksList] = useState([])
  const [drinksFilter, setDrinksFilter] = useState([])
  const [errorApi, setErrorApi] = useState([''])

  return (
    <div>
      <Navbar className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="./" className="brand-cocktail d-flex align-items-center fs-1">
            <img
              alt="cocktail-glass"
              src="https://www.thecocktaildb.com/images/cocktail_left.png"
              height="60"
              className="d-inline-block align-top"
            />{' '}
            Cocktails Finder
          </Navbar.Brand>
          <Buscador  
            drinksList={drinksList}
            drinksFilter={drinksFilter}
            setDrinksFilter={setDrinksFilter}/> 
        </Container>
      </Navbar>
      <MiApi 
        drinksFilter={drinksFilter}
        setDrinksList={setDrinksList}
        errorApi={errorApi}
        setErrorApi={setErrorApi}
       />
    </div>
  )
}

export default App
