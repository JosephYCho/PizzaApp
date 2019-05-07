import React from "react";
import * as toppingService from "../../services/toppingService";
import ToppingForm from './ToppingForm';
import ToppingList from './ToppingList'


export class Topping extends React.Component {
  state = {
    toppings: []
  };

  componentDidMount() {
    this.onLoadPage();
  }

  onLoadPage = () => {
    toppingService.getAll()
    .then(this.onGetAllSuccess)
    .catch(this.onAxiosFail)
  };

  onGetAllSuccess = response => {
    console.log(response);
    const toppings = response.items

    this.setState({
        toppings
    })
  };

//   handleDelete = (id)=>{
//     toppingService.DeleteTopping(id)
//         .then(this.onDeleteSuccess)
//         .catch(this.onAxiosFail)
//   }

  onDeleteSuccess=(response)=>{
      console.log(response)
  }
 
  getById = (id) => {
      toppingService.getById(id)
      .then(this.onGetByIdSuccess)
      .catch(this.onAxiosFail)
  };

  onGetByIdSuccess = (response)=>{
    console.log(response.item)
    const toppings = [
        ...this.state.toppings,
        response.item
    ]

    console.log(toppings)
    this.setState({
        toppings
    })
  }

  onAxiosFail =(error)=>{
    console.log(error)
}


  render() {
    return <div>
        <ToppingForm onAdd={this.getById} />
        <ToppingList toppings = {this.state.toppings}/>

    </div>;
  }
}

