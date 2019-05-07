import React from 'react';
import ToppingDisplay from './ToppingDisplay';

const mapToppings =({toppings,onDeleteClick})=>{
    const mapToppings =toppings.map((topping,index) =>(
        <ToppingDisplay 
            key={topping.id}
            topping={topping.name}
            id={topping.id}
            counter={index+1}
            onDeleteClick={onDeleteClick}
        />


    ));
    return mapToppings; 
}



export default React.memo(mapToppings)