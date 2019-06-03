import React from "react";
import MapToppingAnimation from "./MapToppingAnimation";

class PizzaAnimation extends React.Component {
  render() {
    return (
      <div className="pizza-container">
        <div className="pizza">
          <MapToppingAnimation toppings={this.props.toppings} />
        </div>
      </div>
    );
  }
}

export default PizzaAnimation;
