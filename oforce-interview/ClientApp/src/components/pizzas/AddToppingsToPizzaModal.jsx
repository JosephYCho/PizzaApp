import React from "react";
import {
  Modal,
  ModalBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback
} from "reactstrap";
import * as pizzaToppingService from "../../services/pizzaToppingService";
import PizzaDropdown from "./PizzaToppingDropdown";

class AddToppingsToPizzaModal extends React.Component {
  state = {
    pizzaId: null,
    //toppingId: null,
    selectedValue: "Select Toppings",
    toppingMapped: [],
    toppings: this.props.toppings,
    errors: {
      name: false
    }
  };

  componentDidMount() {
    
    this.updateMappedToppings(this.props.toppings);
  }

  updateMappedToppings = toppings => {
    const mappedToppings = this.mapTopping(toppings);
    this.setState({
      selectedValue: "Select Toppings",
      pizzaId: this.props.location.state.id,
      toppingMapped: mappedToppings
    });
  };

  // handleChange = e => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   this.setState(
  //     {
  //       [name]: value
  //     },
  //     () => this.validate(name, value)
  //   );
  // };

  // validate = (target, value) => {
  //   if (!value) {
  //     this.setState({
  //       errors: {
  //         ...this.state.errors,
  //         [target]: true
  //       }
  //     });
  //   }
  // };

  // handleTouch = e => {
  //   const name = e.target.name;
  //   if (!e.target.value) {
  //     this.setState({
  //       errors: {
  //         ...this.state.errors,
  //         [name]: true
  //       }
  //     });
  //   }
  // };

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
    console.log(e.target.value);
    this.setState({
      selectedValue: e.target.value
    });
  };

  mapTopping = toppings => {
    console.log("inside");
    const toppingList = toppings.map(topping => (
      <option key={topping.id} value={topping.id}>
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

  handleClick = () => {
    const id = Number(this.state.selectedValue);
    const data = {
      pizzaId: this.state.pizzaId,
      toppingId: id
    };
    console.log(data);
    pizzaToppingService
      .insertToppingToPizza(data)
      .then(this.onInsertSuccess)
      .then(() => this.updateDropdown(id))
      .then(() => this.updateMappedToppings(this.state.toppings))
      //.then(this.clearForm)
      .catch(this.onInsertFail);
  };

  onInsertSuccess = response => {
    console.log(response);
    //const id = response.item;
    //this.props.onAdd(id);
  };

  onInsertFail = error => {
    console.log(error);
  };

  render() {
    return (
      <Modal isOpen={true} toppings={this.props.toppings}>
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

              {/* <PizzaDropdown toppings={this.props.toppings} onChange={this.handleChange}/> */}
            </FormGroup>

            <Button type="button" onClick={this.handleClick}>
              Add
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default AddToppingsToPizzaModal;
