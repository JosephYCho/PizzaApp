import React from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback
} from "reactstrap";
import { Route } from "react-router-dom";
import AddToppingToPizzaModal from "./AddToppingsToPizzaModal";

export class PizzaForm extends React.Component {
  state = {
    id: null,
    name: "",
    errors: {
      name: false
    }
  };

  componentDidMount() {
    this.onPageLoad();
  }

  onPageLoad = () => {
    console.log("dsafasdf");
    if (this.props.location.state) {
      this.setState(
        {
          id: this.props.location.state.id,
          name: this.props.location.state.name
        },
        () => this.props.setModal(true)
      );
    } else {
      this.props.setModal(true);
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
    const { id, name } = this.state;
    if (this.props.pizzaId) {
      this.props.handleUpdate({ id, name }, this.state.id);
    } else {
      this.props.handlePizzaInsert({ name });
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.modal}
        modalTransition={{ timeout: 200 }}
        backdropTransition={{ timeout: 100 }}
        toggle={this.props.toggle}
        fade={true}
      >
        <ModalHeader toggle={this.props.toggle}>Create</ModalHeader>
        <ModalBody>
          <Form>
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
              render={props => (
                <AddToppingToPizzaModal
                  {...props}
                  onAdd={this.props.onAdd}
                  toppings={this.props.toppings}
                  toggle={this.props.toggle}
                  modal={this.props.modal}
                  setModal={this.props.setModal}
                />
              )}
            />
            <Button type="button" onClick={this.handleClick}>
              Next
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}
