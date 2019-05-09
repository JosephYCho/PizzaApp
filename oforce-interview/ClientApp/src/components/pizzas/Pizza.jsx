import React from "react";
import PizzaHeader from "./PizzaHeader";
import * as pizzaService from "../../services/pizzaService";
import * as toppingService from "../../services/toppingService";
import PizzaList from "./PizzaList";

export class Pizza extends React.Component {
  state = {
    pizzas: [],
    toppings: [],
    id: null,
    name:"",
    modal: false
  };

  componentDidMount() {
    this.onLoadPage();
  }

  onLoadPage = () => {
    this.getAllToppings();
    this.getAllPizzas();
  };

  toggle = () => {
    this.props.history.push(`/pizzas`);
  };

  setModal = modal => {
    this.setState({ modal });
  };
  closeRoutePath = () => {
    this.props.history.push(`/pizzas`);
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

  getById = id => {
    pizzaService
      .getById(id)
      .then(this.onGetByIdSuccess)
      .catch(this.onAxiosFail);
  };

  onGetByIdSuccess = response => {
    const pizzas = [response.item, ...this.state.pizzas];
    this.setState({
      pizzas
    });
  };

  handlePizzaInsert = data => {
    pizzaService
      .insertPizza(data)
      .then(this.onInsertSuccess)
      .catch(this.onInsertFail);
  };

  onInsertSuccess = response => {
    console.log(response);
    const id = response.item;
    this.routeToAddToppings(id);
  };

  routeToAddToppings = id => {
    this.props.history.push("/pizzas/createpizza/addtoppings", { id:id });
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

  onUpdateClick = data => {
    this.setState(
      {
        id: data.id,
        name: data.name
      },
      this.routeToUpdatePizza
    );
  };

  routeToUpdatePizza = () => {
    const id = this.state.id;
    const name = this.state.name;
    this.props.history.push("/pizzas/createpizza", { id: id, name: name });
  };

  
  handleUpdate = (data, id) => {
    pizzaService
      .updatePizza(data, id)
      .then(this.onUpdateSuccess)
      .then(this.onSuccessRoute)
      .catch(this.onAxiosFail);
  };

  onUpdateSuccess = data => {
    console.log(data);
    this.setState(prevState => {
      let index = prevState.pizzas.findIndex(pizza => pizza.id === data.id);
      let newArr = prevState.toppings.slice();
      newArr[index] = data;
      const pizzas = newArr;
      return { pizzas };
    });
  };

  onSuccessRoute = id => {
    console.log(id);
    this.routeToAddToppings(id);
  };

  handleDelete = id => {
    pizzaService
      .deletePizza(id)
      .then(this.onDeleteSuccess)
      .then(() => this.removeDeletedPizza(id))
      .catch(this.onAxiosFail);
  };

  onDeleteSuccess = response => {
    console.log(response);
  };

  removeDeletedPizza = id => {
    this.setState(prevState => {
      const updatedArr = prevState.pizzas.filter(pizza => {
        return pizza.id !== id;
      });
      return { pizzas: updatedArr };
    });
  };

  render() {
    return (
      <div>
        <PizzaHeader
          toppings={this.state.toppings}
          onAdd={this.getById}
          handleUpdate={this.handleUpdate}
          handlePizzaInsert={this.handlePizzaInsert}
          modal={this.state.modal}
          toggle={this.toggle}
          setModal={this.setModal}
        />
        <PizzaList
          pizzas={this.state.pizzas}
          getDate={this.getDate}
          onUpdateClick={this.onUpdateClick}
          onDeleteClick={this.handleDelete}
        />
      </div>
    );
  }
}
