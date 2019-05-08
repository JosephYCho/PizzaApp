import React from 'react';
import PizzaDisplay from './PizzaDisplay';

const mapPizzas = ({pizzas,getDate})=>{
    const mapPizzas = pizzas.map((pizza,index)=>(
        <PizzaDisplay
            key={pizza.id}
            pizza={pizza}
            toppings={pizza.toppings}
            id={pizza.id}
            getDate={getDate}
            

        />

    ))
    return mapPizzas;
}



export default React.memo(mapPizzas);