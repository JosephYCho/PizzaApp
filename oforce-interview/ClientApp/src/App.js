import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import {Topping} from './components/toppings/Topping';
import {Pizza} from './components/pizzas/Pizza';
import './App.css';



export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/toppings" component={Topping} />
        <Route path="/pizzas" component={Pizza} />
      </Layout>
    );
  }
}
