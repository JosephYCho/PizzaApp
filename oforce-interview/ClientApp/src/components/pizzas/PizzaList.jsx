import React from "react";
import * as pizzaService from '../../services/pizzaService';
import * as toppingService from '../../services/toppingService';

class PizzaList extends React.Component {

state ={
  pizzas:[]
}
  onLoadPage = ()=>{
  }

  




  render() {
    return (
      <div className="d-flex no-block">
        <div className="col-md-12">
          <div className="table table-responsive stylish-table">
            <table className="col-md-12 table-bordered table-hover footable-5 footable-paging footable-paging-center breakpoint-lg">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Toppings</th>
                  <th>Post Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default PizzaList;
