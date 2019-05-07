import React from "react";
import MapToppings from "./MapToppings";
import { Card, CardBody, CardTitle, Table } from "reactstrap";

class ToppingList extends React.Component {
  render() {
    return (
      <div className="ToppingListContainer">
        <Card>
          <CardBody>
            <CardTitle>Toppings Avaliable:</CardTitle>
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Toppings</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <MapToppings toppings={this.props.toppings} />
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default ToppingList;
