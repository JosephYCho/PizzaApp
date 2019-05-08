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

class ToppingForm extends React.Component {
  state = {
    id: null,
    name: "",
    errors: {
      name: false
    }
  };
  componentDidUpdate(prevProp) {
    if (this.props.id !== prevProp.id) {
      this.onPageLoad();
    }
  }

  onPageLoad = () => {
    this.setState({
      id: this.props.id,
      name: this.props.name
    });
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
    } else {
      this.setState({
        errors: {
          ...this.state.errors,
          [target]: false
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
      
      errors: {
        ...this.state.errors,
        name: false
      }
    });
  };

   handleSubmit= e => {
    e.preventDefault();
    const updateId = this.state.id;
    const { id, name } = this.state;

    this.props.id
      ? this.props.handleUpdate({ id, name }, updateId)
      : this.props.handleInsert({ name })

      this.clearForm();

  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="topping">Topping</Label>
          <Input
            type="text"
            name="name"
            id="topping"
            placeholder="Enter Toppings Here"
            invalid={this.state.errors.name}
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
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default ToppingForm;
