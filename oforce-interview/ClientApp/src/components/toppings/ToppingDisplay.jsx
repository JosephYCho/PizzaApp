import React from "react";
import { Button } from "reactstrap";

class ToppingDisplay extends React.PureComponent {
  handleDelete = () => {
    console.log("delete");
    this.props.onDeleteClick(this.props.id);
  };

  render() {
    return (
      <React.Fragment>
        <tr>
          <td className="">{this.props.counter + ". "}</td>
          <td className="col" id="toppingTable">
            {this.props.topping}
          </td>

          <td className="toppingBtn">
            <div className="row justify-content-center">
              <Button
                outline
                color="danger"
                size="sm"
                onClick={this.handleDelete}
              >
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
