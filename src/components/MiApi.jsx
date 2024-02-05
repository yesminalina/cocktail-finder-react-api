import { useEffect} from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import './MiApi.css'

const MiApi = ({setDrinksList, drinksFilter, errorApi, setErrorApi}) => {

  const getQuery = async (query) =>  {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
    const response = await fetch(url)
    const data = await response.json()
    return data.drinks || []
  }

  const getCocktails = async () => {
    try {
      const [ginResults, rumResults, piscoResults, vodkaResults, beerResults, wineResults] = await Promise.all([
        getQuery('gin'), getQuery('rum'), getQuery('pisco'), getQuery('vodka'), getQuery('beer'), getQuery('wine')
      ])
      setDrinksList([...ginResults, ...rumResults, ...piscoResults, ...vodkaResults, ...beerResults, ...wineResults].sort(() => Math.random() - 0.5))
    } catch (e) {setErrorApi(`We can't get your drinks right now, try later ;) : ${e}`)}

  }

  useEffect( () => {
    getCocktails()
  }, [])

  return (
    <>
      <h3>{errorApi}</h3>
      <Row xs={2} md={3} className="cocktails-grid g-4 m-0 pb-4">
        {drinksFilter.map((drink) => ( 
          <Col key={drink.idDrink}>
            <Card>
              <Card.Img variant="top" src={drink.strDrinkThumb} />
              <Card.Body>
                <Card.Title>{drink.strDrink}</Card.Title>
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>How to prepare {drink.strDrink}</Accordion.Header>
                      <Accordion.Body>
                        {drink.strInstructions}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                <ListGroup variant="flush">
                  {Array.from({ length: 15}).map((v, i)=>(
                    drink[`strIngredient${i+1}`] ? 
                    <ListGroup.Item key={drink[`strIngredient${i+1}`]}>
                      { drink[`strIngredient${i+1}`]} - {drink[`strMeasure${i+1}`] }
                    </ListGroup.Item> : null
                    ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
       ))}
      </Row>
    </>

  )
}

export default MiApi
