import React from "react";
import MapPizzas from "./MapPizzas";

const pizzaList = ({ pizzas, getDate }) => {
  const pizzaList = (
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
              <MapPizzas pizzas={pizzas} getDate={getDate} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  return pizzaList;
};

export default React.memo(pizzaList);
