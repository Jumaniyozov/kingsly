import React from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import Header from "./components/header/Header.component";
import Homepage from "./pages/homepage/Homepage.component";
import ShopPage from './pages/shop/Shop.component';


function App() {
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/shop" component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
