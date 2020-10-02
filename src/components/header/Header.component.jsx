import React from "react";
import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";

import {Link} from "react-router-dom";
import "./Header.styles.scss";

import {auth} from "../../firebase/firebase.utils";
import CartIcon from '../cart-icon/CartIcon.component';
import CartDropdown from "../cart-dropdown/CartDropdown.components";
import {ReactComponent as Logo} from "./../../assets/crown.svg";
import {selectCartHidden} from "../../redux/cart/cart.selectors";
import {selectCurrentUser} from "../../redux/user/user.selectors";


const Header = ({currentUser, hidden}) => (
    <div className="header">
        <Link to="/">
            <Logo className="logo"/>
        </Link>
        <div className="options">
            <Link className="option" to="/shop">
                SHOP
            </Link>
            <Link className="option" to="/contact" F>
                CONTACT
            </Link>
            {currentUser ? (
                <div className="option" onClick={() => auth.signOut()}>
                    Sign Out
                </div>
            ) : (
                <Link className="option" to="/signin">SIGN IN</Link>
            )}
            <CartIcon/>
        </div>
        {hidden ? null : <CartDropdown/>}
    </div>
);

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
