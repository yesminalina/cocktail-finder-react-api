import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';

const Selector = ({licors, drinksList, drinksFilter, setDrinksFilter}) => {
    const [selectOpt, setSelectOpt] = useState("")

    const optionsRender = 
        licors.map((licor) => (
            <option key={licor} value={licor}>{licor}</option>
        ))
    
    const handleSelect = (e) => {
        setSelectOpt(e.target.value)
    }

    const selectByIng = () => {
        let results = []
        if (selectOpt === "") {
            results = drinksList
        } else {
            results = drinksList.filter((drink) => (
                drink.strIngredient1.toLowerCase().includes(selectOpt.toLocaleLowerCase())
            ))
        }
        console.log(selectOpt)
        setDrinksFilter(results)


    }

    useEffect(() => {
        selectByIng()
    }, [selectOpt])


  return (
    <Form.Select className='w-70'onChange={handleSelect}>
      <option value="" >Select by ingredient</option>
      {optionsRender}
    </Form.Select>
  )
}

export default Selector
