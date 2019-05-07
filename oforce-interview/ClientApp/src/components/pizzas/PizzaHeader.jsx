import React from "react";
import { Route } from "react-router";
import { withRouter } from "react-router-dom";

import { PizzaForm } from "./PizzaForm";
import PizzaList from './PizzaList';

class PizzaHeader extends React.Component {
  handleClick = () => {
    this.props.history.push("/pizzas/createpizza");
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
          <PizzaList />
          <Route path="/pizzas/createpizza"
          //  component={PizzaForm} 
          render={(props) =><PizzaForm {...props} toppings={this.props.toppings} />}
           />
        </div>
      </div>
    );
  }
}

export default withRouter(PizzaHeader);
