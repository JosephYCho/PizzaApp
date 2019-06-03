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

import * as fileUploadService from "../../services/fileUploadService";

class ToppingForm extends React.Component {
  state = {
    id: null,
    name: "",
    toppingImage: "",
    isSauce: false,
    fileValue: null,
    errors: {
      name: false
    }
  };

  handleChangeCheckbox = e => {
    const name = e.target.name;
    const value = !this.state.isSauce;
    this.setState({
      [name]: value
    });
  };

  validate = (target, value) => {
    if (!value) {
      this.setState({
        id: null,
        name: "",
        toppingImage: "",
        fileValue: "",
        errors: {
          ...this.state.errors,
          name: false
        }
      });
    }
  };
  handleImage = e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    this.setState({
      fileValue: e.target.value
    });
    fileUploadService
      .fileUpload(formData)
      .then(this.onFileUploadSuccess)
      .catch(this.onFileUploadError);
  };

  onFileUploadSuccess = response => {
    console.log(response.item);
    this.setState({
      toppingImage: response.item.urlName
    });
  };

  onFileUploadError = error => {
    console.log(error);
  };

  handleSubmit = async e => {
    e.preventDefault();
    const updateId = this.state.id;
    const { id, name, toppingImage, isSauce } = this.state;

    this.props.id
      ? await this.props.handleUpdate(
          { id, name, toppingImage, isSauce },
          updateId
        )
      : await this.props.handleInsert({ name, toppingImage, isSauce });

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
        <FormGroup tag="fieldset">
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="isSauce"
                checked={this.state.isSauce}
                onChange={this.handleChangeCheckbox}
              />{" "}
              Check this if the topping being added is a Sauce or Cheese.
            </Label>
          </FormGroup>
        </FormGroup>
        <FormGroup>
          <Label for="file">Upload an Image of the Topping</Label>
          <Input
            type="file"
            value={this.state.fileValue}
            onChange={this.handleImage}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default ToppingForm;
