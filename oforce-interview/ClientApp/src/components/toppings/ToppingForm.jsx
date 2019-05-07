import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback
} from "reactstrap";
import * as toppingService from "../../services/toppingService";

class ToppingForm extends React.Component {
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

  handleClick = () => {
    const { name } = this.state;
    toppingService
      .insertTopping({ name })
      .then(this.onInsertSuccess)
      .then(this.clearForm)
      .catch(this.onInsertFail);
  };

  onInsertSuccess = response => {
    console.log(response);
    const id = response.item;
    this.props.onAdd(id);
  };

  onInsertFail = error => {
    console.log(error);
  };

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="topping">Topping</Label>
          <Input
            type="text"
            name="name"
            id="topping"
            placeholder="Enter Toppings Here"
            invalid={this.state.errors.topping}
            onChange={this.handleChange}
            onBlur={this.handleTouch}
            value={this.state.name}
          />
          {this.state.errors.topping ? (
            <FormFeedback>Please Enter A Topping</FormFeedback>
          ) : (
            <FormText>Enter A Topping</FormText>
          )}
        </FormGroup>
        <Button type="button" onClick={this.handleClick}>
          Add
        </Button>
      </Form>
    );
  }
}

export default ToppingForm;
