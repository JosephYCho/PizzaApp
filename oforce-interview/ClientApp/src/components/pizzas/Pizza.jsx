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
    const pizzas = response.items;
    this.setState({
      pizzas
    });
  };

  onAxiosFail = error => {
    console.log(error);
  };

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

  render() {
    return (
      <div>
        <PizzaHeader toppings={this.state.toppings} />
        <PizzaList pizzas={this.state.pizzas} getDate={this.getDate} />
      </div>
    );
  }
}
