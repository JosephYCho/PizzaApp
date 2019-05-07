import React from 'react';
import ToppingDisplay from './ToppingDisplay';

const mapToppings =({toppings})=>{
    const mapToppings =toppings.map((topping,index) =>(
        <ToppingDisplay 
            key={topping.id}
            topping={topping.name}
            counter={index+1}
        />


    ));
    return mapToppings; 
}



export default React.memo(mapToppings)