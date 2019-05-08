import React from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  Form,
  FormGroup
} from "reactstrap";
import * as pizzaToppingService from "../../services/pizzaToppingService";
import ToppingsBreadcrumb from "./ToppingsBreadcrumb";

class AddToppingsToPizzaModal extends React.Component {
  state = {
    pizzaId: null,
    selectedValue: "Select Toppings",
    toppingMapped: [],
    toppings: [],
    selectedTopping: "",
    progress: [],
    modal: true,
    errors: {
      name: false
    }
  };

  componentDidMount() {
    this.updateMappedToppings(this.props.toppings);
  }

  // toggle = () => {
  //   this.props.toggle();
  // };

  updateMappedToppings = toppings => {
    const mappedToppings = this.mapTopping(toppings);
    this.setState({
      toppings,
      selectedValue: "Select Toppings",
      pizzaId: this.props.location.state.id,
      toppingMapped: mappedToppings
    });
  };

  clearForm = () => {
    this.setState({
      name: "",
      error: {
        ...this.state.errors,
        name: false
      }
    });
  };

  handleChange = e => {
    const value = JSON.parse(e.target.value);
    //const selectedIndex = e.target.options.selectedIndex -1;
    //const name = this.state.toppings[selectedIndex].name;

    this.setState({
      selectedValue: value.id,
      selectedTopping: value.name
    });
  };

  mapTopping = toppings => {
    console.log("inside");
    const toppingList = toppings.map(topping => (
      <option key={topping.id} value={JSON.stringify(topping)}>
        {topping.name}
      </option>
    ));

    return toppingList;
  };

  updateDropdown = id => {
    this.setState(prevState => {
      const updatedArr = prevState.toppings.filter(topping => {
        return topping.id !== id;
      });
      return { toppings: updatedArr };
    });
  };

  handleProgress = name => {
    this.setState({
      progress: [...this.state.progress, name]
    });
  };

  handleAdd = () => {
    const id = Number(this.state.selectedValue);
    const data = {
      pizzaId: this.state.pizzaId,
      toppingId: id
    };
    console.log(data);
    pizzaToppingService
      .insertToppingToPizza(data)
      .then(this.onInsertSuccess)
      //.then(()=>this.handleProgress(this.state.selectedTopping))
      .then(() => this.updateDropdown(id))
      .then(() => this.updateMappedToppings(this.state.toppings))
      //.then(this.clearForm)
      .catch(this.onAxiosFail);
  };

  onInsertSuccess = response => {
    console.log(response);
    this.handleProgress(this.state.selectedTopping);
  };

  onAxiosFail = error => {
    console.log(error);
  };

  handleSubmit = () => {
    this.props.onAdd(this.props.location.state.id);
    this.props.toggle();
  };

  render() {
    return (
      <Modal
        isOpen={this.state.modal}
        modalTransition={{ timeout: 200 }}
        backdropTransition={{ timeout: 100 }}
        toggle={this.props.toggle}
        fade={true}
        toppings={this.props.toppings}
      >
        <ModalHeader toggle={this.props.toggle}>Add Toppings</ModalHeader>
        <ModalBody toppings={this.props.toppings}>
          <Form toppings={this.props.toppings}>
            <FormGroup toppings={this.props.toppings}>
              <select
                className="custom-select"
                value={this.state.selectedValue}
                onChange={this.handleChange}
              >
                <option value="Select Toppings" disabled>
                  {" "}
                  Select Toppings..
                </option>
                {this.state.toppingMapped}
              </select>
            </FormGroup>
            {this.state.progress[0] ? (
              <ToppingsBreadcrumb progress={this.state.progress} />
            ) : (
              <div />
            )}
            <Button
              type="button"
              className="btn btn-success float-left"
              onClick={this.handleAdd}
            >
              Add
            </Button>
            <Button
              type="button"
              className="btn btn-warning  float-right"
              onClick={this.handleSubmit}
            >
              Done
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default AddToppingsToPizzaModal;
