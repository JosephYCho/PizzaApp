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
import * as pizzaService from "../../services/pizzaService";
import { Route } from "react-router-dom";
import AddToppingToPizzaModal from "./AddToppingsToPizzaModal";

export class PizzaForm extends React.Component {
  state = {
    name: "",
    errors: {
      name: false
    }
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(
      {
        [name]: value
      },
      () => this.validate(name, value)
    );
  };

  validate = (target, value) => {
    if (!value) {
      this.setState({
        errors: {
          ...this.state.errors,
          [target]: true
        }
      });
    }
  };

  handleTouch = e => {
    const name = e.target.name;
    if (!e.target.value) {
      this.setState({
        errors: {
          ...this.state.errors,
          [name]: true
        }
      });
    }
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

  routeToAddToppings = id => {
    this.props.history.push("/pizzas/createpizza/addtoppings", { id: id });
  };

  handleClick = () => {
    const { name } = this.state;
    pizzaService
      .insertPizza({ name })
      .then(this.onInsertSuccess)
      .then(this.clearForm)
      .catch(this.onInsertFail);
  };

  onInsertSuccess = response => {
    console.log(response);
    const id = response.item;
    //this.props.onAdd(id);
    this.routeToAddToppings(id);
  };

  onInsertFail = error => {
    console.log(error);
  };

  render() {
    return (
      <Modal isOpen={true} toppings={this.props.toppings}>
        <ModalBody toppings={this.props.toppings}>
          <Form toppings={this.props.toppings}>
            <FormGroup>
              <Label for="pizza">Create A Pizza</Label>
              <Input
                type="text"
                name="name"
                id="pizza"
                placeholder="Enter Pizza Name Here"
                invalid={this.state.errors.topping}
                onChange={this.handleChange}
                onBlur={this.handleTouch}
                value={this.state.name}
              />
              {this.state.errors.topping ? (
                <FormFeedback>Please Enter A Pizza Name</FormFeedback>
              ) : (
                <FormText>Enter The Pizza Name</FormText>
              )}
            </FormGroup>
            <Route
              path="/pizzas/createpizza/addtoppings"
              //  component={PizzaForm}
              render={props => (
                <AddToppingToPizzaModal
                  {...props}
                  toppings={this.props.toppings}
                />
              )}
            />
            <Button type="button" onClick={this.handleClick}>
              Add
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}
