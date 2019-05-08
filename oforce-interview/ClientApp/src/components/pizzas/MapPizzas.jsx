import React from 'react';
import PizzaDisplay from './PizzaDisplay';

const mapPizzas = ({pizzas,getDate, onDelete})=>{
    const mapPizzas = pizzas.map((pizza)=>(
        <PizzaDisplay
            key={pizza.id}
            pizza={pizza}
            toppings={pizza.toppings}
            id={pizza.id}
            getDate={getDate}
            onDelete={onDelete}
            

        />

    ))
    return mapPizzas;
}



export default React.memo(mapPizzas);