import React from "react";
import PizzaHeader from "./PizzaHeader";
import * as pizzaToppingService from "../../services/pizzaToppingService";
import * as pizzaService from "../../services/pizzaService";
import * as toppingService from "../../services/toppingService";
import PizzaList from "./PizzaList";

export class Pizza extends React.Component {
  state = {
    pizzas: [],
    toppings: []
  };

  componentDidMount() {
    this.onLoadPage();
  }

  onLoadPage = () => {
    this.getAllToppings();
    this.getAllPizzas();
  };

  getAllToppings = () => {
    toppingService
      .getAll()
      .then(this.getAllToppingSuccess)
      .catch(this.onAxiosFail);
  };
  getAllToppingSuccess = response => {
    console.log(response.items);
    const toppings = response.items;
    this.setState({
      toppings
    });
  };

  getAllPizzas = () => {
    pizzaService
      .getAllPizzaWithToppings()
      .then(this.getAllPizzasSuccess)
      .catch(this.onAxiosFail);
  };

  getAllPizzasSuccess = response => {
    console.log(response.items);
    const pizzas = response.items.slice().reverse();
    this.setState({
      pizzas
    });
  };

  onAxiosFail = error => {
    console.log(error);
  };

  getById= id =>{
    pizzaService.getById(id)
    .then(this.onGetByIdSuccess)
    .catch(this.onAxiosFail)
  }

  onGetByIdSuccess = response =>{
    //const pizzas = [...this.state.pizzas, response.item]
    const pizzas =[response.item, ...this.state.pizzas]
    this.setState({
      pizzas
    })
  }

  getDate = longDate => {
    let date = new Date(longDate);
    return (
      date.getUTCMonth() +
      1 +
      "/" +
      date.getUTCDate() +
      "/" +
      date.getFullYear()
    );
  };

  handleDelete=(id)=>{
    pizzaService.deletePizza(id)
    .then(this.onDeleteSuccess)
    .then(()=>this.removeDeletedPizza(id))
    .catch(this.onAxiosFail)
  }

  onDeleteSuccess = (response) =>{
    console.log(response)
  }

  removeDeletedPizza = id =>{
    this.setState(prevState=>{
      const updatedArr = prevState.pizzas.filter(pizza=>{
        return pizza.id !== id
      });
      return{pizzas:updatedArr}
    })
  }


  render() {
    return (
      <div>
        <PizzaHeader toppings={this.state.toppings} onAdd={this.getById} />
        <PizzaList pizzas={this.state.pizzas} getDate={this.getDate} onDelete={this.handleDelete} />
      </div>
    );
  }
}
