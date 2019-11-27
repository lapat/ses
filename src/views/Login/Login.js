import React, { useState, useContext } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import { AuthContext } from "index.js";
import * as firebase from 'firebase'
import fire from 'fire';

import { Button, MenuItem, TextField, RootRef } from "@material-ui/core";

import UserContext from 'index.js'

import myInitObject from 'initObject.js'
console.log("MyInitiObj:"+JSON.stringify(myInitObject))



const getButtonStyleProps = () => {
  return {
    style: {
      width: 200,
      height: 50,
      alignSelf: "center",
      background: "#039BE5",
      color: "white"
    }
  };
};

const LoginTwo = () => {
  console.log("window.MyVars.loggedIn:"+window.MyVars.loggedIn)

  const user = useContext(UserContext)
  console.log(user) // { name: 'Tania', loggedIn: true }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");
  {/*
    s@s.com
    ssssss
    */}
  const Auth = useContext(AuthContext);
  const handleForm = e => {
    e.preventDefault();
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => {

      console.log("WINDOW:"+JSON.stringify(window.MyVars))

      if (res.user) {
        console.log("this:"+JSON.stringify(this))
        //this.state = {
        //  user : {loggedIn : true}
        //}
        //this.setState(state => ({
        //  loggedIn: true
        //}));
        window.MyVars.loggedIn = true;
        console.log("myInitObject:"+JSON.stringify(window.MyVars));
        //Swindow.location.replace('/admin/record');
      }
      //console.log("USER NOW:"+JSON.stringify(user));
      //window.location.replace('/admin/record');
    })
    .catch(e => {
      setErrors(e.message);
    });
  };

  console.log("window:"+JSON.stringify(window.MyVars));
  if(!window.MyVars.loggedIn){
  return (

    <div>
      <h1>Login</h1>
      <form onSubmit={e => handleForm(e)}>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="email"
        />
        <input
          onChange={e => setPassword(e.target.value)}
          name="password"
          value={password}
          type="password"
          placeholder="password"
        />
        <hr />

        <button type="submit">Login</button>
        <span>{error}</span>
      </form>
    </div>
  );
}else{
  return(
    <Button
      {...getButtonStyleProps()}
      onClick={async () => {
        await firebase.auth().signOut().then(function() {
          console.log("signed out...")
          window.MyVars.loggedIn = false;
          console.log("window.MyVars.loggedIn:"+window.MyVars.loggedIn)

          //window.location.replace('/admin/login');
        }).catch(function(error) {
          // An error happened.
        });



      }}
    >
      Sign Out
    </Button>
  )
}
};

export default LoginTwo;
