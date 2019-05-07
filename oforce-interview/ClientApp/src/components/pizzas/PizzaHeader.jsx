import React from "react";
import { Route } from "react-router";
import { withRouter } from "react-router-dom";

import { PizzaForm } from "./PizzaForm";

class PizzaHeader extends React.Component {
  state={
    modal:false
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  handleClick = () => {
    this.props.history.push("/pizzas/createpizza");
    this.toggle();
  };

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-outline-info h-100 ">
          <div className="card-header">
            <div className="row">
              <div className="text-left col-md-6">
                <h3 className=" text-black">Pizza</h3>
              </div>
              <div className="text-right col-md-6">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.handleClick}
                >
                  Make A New Pizza
                </button>
              </div>
            </div>
          </div>

          <br />
          {/* <PizzaList /> */}
          <Route path="/pizzas/createpizza"
          //  component={PizzaForm} 
          render={(props) =><PizzaForm {...props} toppings={this.props.toppings} modal={this.state.modal} toggle={this.toggle} />}
           />
        </div>
      </div>
    );
  }
}

export default withRouter(PizzaHeader);
