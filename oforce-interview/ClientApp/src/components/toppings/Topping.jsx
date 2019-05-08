import React from "react";
import * as toppingService from "../../services/toppingService";
import { Route } from "react-router-dom";
import ToppingForm from "./ToppingForm";
import ToppingList from "./ToppingList";

export class Topping extends React.Component {
  state = {
    toppings: [],
    id: null,
    name: ""
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

  handleInsert = data => {
    toppingService
      .insertTopping(data)
      .then(this.onInsertSuccess)
      .catch(this.onAxiosFail);
  };

  onInsertSuccess = response => {
    console.log(response);
    const id = response.item;
    this.setState({
      id: null,
      name: ""
    });
    this.getById(id);
  };

  onInsertFail = error => {
    console.log(error);
  };

  onUpdate = data => {
    this.setState({
      name: data.name,
      id: data.id
    });
  };

  handleUpdate = (data, id) => {
    toppingService
      .updateTopping(data, id)
      .then(this.onUpdateSuccess)
      .then()
      .catch(this.onAxiosFail);
  };

  onUpdateSuccess = data => {
    console.log(data);
    this.setState(prevState => {
      let index = prevState.toppings.findIndex(
        topping => topping.id === data.id
      );
      let newArr = prevState.toppings.slice();
      newArr[index] = data;
      const toppings = newArr;
      return { toppings, id: null, name: "" };
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
        <ToppingForm
          handleInsert={this.handleInsert}
          handleUpdate={this.handleUpdate}
          id={this.state.id}
          name={this.state.name}
        />

        <ToppingList
          toppings={this.state.toppings}
          onDeleteClick={this.handleDelete}
          onUpdateClick={this.onUpdate}
        />
      </div>
    );
  }
}
