import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import Header from "./components/header/Header.component";
import SignInNSignUp from "./pages/signInNSignUp/SignInNSignUp.component";
import Homepage from "./pages/homepage/Homepage.component";
import ShopPage from "./pages/shop/Shop.component";

import { auth } from "./components/firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      currentUser: null
    }
  }

  unsubscrieFromAuth = null;

  componentDidMount() {
    this.unsubscrieFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user});

      console.log(user);
    });
  } 

  componentWillUnmount() {
    this.unsubscrieFromAuth(); 
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignInNSignUp} />
        </Switch>
      </div>
    );
  }
}
export default App;
