import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import "./App.css";

import Header from "./components/header/Header.component";
import SignInNSignUp from "./pages/signInNSignUp/SignInNSignUp.component";
import Homepage from "./pages/homepage/Homepage.component";
import ShopPage from "./pages/shop/Shop.component";
import {auth, createUserProfileDocument} from "./firebase/firebase.utils";
import {setCurrentUser} from "./redux/user/user.actions";
import {selectCurrentUser} from "./redux/user/user.selectors";
import {createStructuredSelector} from "reselect";
import CheckoutPage from "./pages/checkout/Checkout.component";

class App extends React.Component {
    unsubscrieFromAuth = null;

    componentDidMount() {
        const {setCurrentUser} = this.props;

        this.unsubscrieFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapshot => {
                    setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data()

                    })
                })
            }
            setCurrentUser(userAuth);
        });
    }

    componentWillUnmount() {
        this.unsubscrieFromAuth();
    }

    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/" component={Homepage}/>
                    <Route exact path="/shop" component={ShopPage}/>
                    <Route exact path="/signin"
                           render={() => this.props.currentUser ?
                               (
                                   <Redirect to='/'/>
                               ) : (
                                   <SignInNSignUp/>
                               )}/>
                    <Route exact path="/checkout" component={CheckoutPage}/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
