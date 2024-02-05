import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import './Buscador.css'

const Buscador = ({drinksList, drinksFilter, setDrinksFilter}) => {
    const [search, setSearch] = useState("")


    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleFilter = () => {
        let results = []
        if (search === "") {
            results = drinksList
            setDrinksFilter(results)
        } else {
            results = drinksList.filter((drink) => (
                drink.strDrink.toLowerCase().includes(search.toLowerCase())
                ))
                setDrinksFilter(results.sort(
                (a,b) => {
                  if (a.strDrink < b.strDrink) {
                    return -1
                  }
                  if (a.strDrink > b.strDrink) {
                    return 1
                  }
                  if (a.strDrink === b.strDrink) {
                    return 0
                  }}
                ))
        }
    }

    useEffect(() => {
        handleFilter()
    }, [drinksList] )

    useEffect(() => {
        setSearch("")
    }, [drinksFilter])

  return (
    <div className='buscador'>
        <InputGroup className="mb-3">
            <Form.Control
            placeholder="Search by name"
            aria-label="Search by name"
            aria-describedby="basic-addon1"
            name="search"
            value={search}
            onChange={handleSearch}
            />
            <Button className="me-3" variant="outline-warning" onClick={handleFilter} >Search</Button>
        </InputGroup>

    </div>
  )
}

export default Buscador
