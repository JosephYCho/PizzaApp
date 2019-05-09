import React from "react";
import MapToppings from "./MapToppings";
import { Card, CardBody, CardTitle, Table } from "reactstrap";


  const toppingList=({toppings,onUpdateClick,onDeleteClick})=>{

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
                <MapToppings toppings={toppings} onUpdateClick={onUpdateClick} onDeleteClick={onDeleteClick}/>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    );
  }
  

export default React.memo(toppingList);
