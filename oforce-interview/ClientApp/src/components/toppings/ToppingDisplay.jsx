import React from "react";
import { CardText, Button } from "reactstrap";

class ToppingDisplay extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        {/* <CardText>
                    {this.props.topping}
                </CardText> */}
        <tr>
          <td className="">{this.props.counter + ". "}</td>
          <td className="col" id="toppingTable">
            {this.props.topping}
          </td>

          <td className="toppingBtn">
            <div className="row justify-content-center">
              <Button outline color="danger" size="sm">
                Delete
              </Button>
              {/* <Button close aria-label="Cancel">
                <span aria-hidden>&ndash;</span>
              </Button> */}
            </div>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default ToppingDisplay;
