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
    selectedId:null,
    progress: [],
    modal: true,
    disable: true
  };

  componentDidMount() {
    this.props.setModal(true);
    this.updateMappedToppings(this.props.toppings);
  }

  updateMappedToppings = toppings => {
    const mappedToppings = this.mapTopping(toppings);
    this.setState({
      toppings,
      selectedValue: "Select Toppings",
      pizzaId: this.props.location.state.id,
      toppingMapped: mappedToppings
    });
  };


  handleChange = e => {
    const value = JSON.parse(e.target.value);
  
    this.setState({
      selectedValue: e.target.value,
      selectedTopping: value.name,
      selectedId: value.id
    });
  };

  mapTopping = toppings => {
    
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
      disable: false,
      progress: [...this.state.progress, name]
    });
  };

  handleAdd = () => {
    const id = this.state.selectedId;
    const pizzaId = this.state.pizzaId;
    
    const data = {
      pizzaId: pizzaId,
      toppingId: id
    };
    
    pizzaToppingService
      .insertToppingToPizza(data)
      .then(this.onInsertSuccess)
      .then(() => this.updateDropdown(id))
      .then(() => this.updateMappedToppings(this.state.toppings))
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
        isOpen={this.props.modal}
        modalTransition={{ timeout: 150 }}
        backdropTransition={{ timeout: 100 }}
        toggle={this.props.toggle}
        fade={true}
      >
        <ModalHeader toggle={this.props.toggle}>Add Toppings</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
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
              disabled={this.state.disable}
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
