import React from "react";

import './SignInNSignUp.component.scss';

import SignIn from "../../components/sign-in/SignIn.component";
import SignUp from "../../components/sign-up/SignUp.component";

const SignInNSignUp = () => (   
    <div className="sign-in-and-sign-up">
       <SignIn/>
       <SignUp/>
    </div>
);

export default SignInNSignUp;
