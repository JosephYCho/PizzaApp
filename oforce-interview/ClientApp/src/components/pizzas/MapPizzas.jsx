import React from 'react';
import PizzaDisplay from './PizzaDisplay';

const mapPizzas = ({pizzas,getDate, onDeleteClick,onUpdateClick})=>{
    const mapPizzas = pizzas.map((pizza)=>(
        <PizzaDisplay
            key={pizza.id}
            pizza={pizza}
            toppings={pizza.toppings}
            id={pizza.id}
            getDate={getDate}
            onDeleteClick={onDeleteClick}
            onUpdateClick={onUpdateClick}
            

        />

    ))
    return mapPizzas;
}



export default React.memo(mapPizzas);