import React from "react";
import * as toppingService from "../../services/toppingService";
import ToppingForm from "./ToppingForm";
import ToppingList from "./ToppingList";

export class Topping extends React.Component {
  state = {
    toppings: []
  };

  componentDidMount() {
    this.onLoadPage();
  }
  setToppings = toppings => {
    this.setState({
      toppings
    });
  };

  onLoadPage = () => {
    toppingService
      .getAll()
      .then(this.onGetAllSuccess)
      .catch(this.onAxiosFail);
  };

  onGetAllSuccess = response => {
    console.log(response);
    const toppings = response.items;

    this.setToppings(toppings);
  };

  handleDelete = id => {
    toppingService
      .deleteTopping(id)
      .then(this.onDeleteSuccess)
      .then(() => this.removeDeletedTopping(id))
      .catch(this.onAxiosFail);
  };

  onDeleteSuccess = response => {
    console.log(response);
  };

  removeDeletedTopping = id => {
    this.setState(prevState => {
      const updatedArr = prevState.toppings.filter(topping => {
        return topping.id !== id;
      });
      return { toppings: updatedArr };
    });
  };

  getById = id => {
    toppingService
      .getById(id)
      .then(this.onGetByIdSuccess)
      .catch(this.onAxiosFail);
  };

  onGetByIdSuccess = response => {
    console.log(response.item);
    const toppings = [...this.state.toppings, response.item];
    this.setToppings(toppings);
  };

  onAxiosFail = error => {
    console.log(error);
  };

  render() {
    return (
      <div>
        <ToppingForm onAdd={this.getById} />
        <ToppingList
          toppings={this.state.toppings}
          onDeleteClick={this.handleDelete}
        />
      </div>
    );
  }
}
