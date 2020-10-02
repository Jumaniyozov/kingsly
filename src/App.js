import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from 'react-redux';

import "./App.css";

import Header from "./components/header/Header.component";
import SignInNSignUp from "./pages/signInNSignUp/SignInNSignUp.component";
import Homepage from "./pages/homepage/Homepage.component";
import ShopPage from "./pages/shop/Shop.component";
import {auth, createUserProfileDocument} from "./firebase/firebase.utils";
import {setCurrentUser} from "./redux/user/user.actions";

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
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
