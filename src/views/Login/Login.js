import React, { useState, useContext } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

//import * as firebase from 'firebase'
import firebase from 'fire';

import { Button, MenuItem, TextField, RootRef } from "@material-ui/core";

import history from 'history.js';




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

/*
class LoginTwoComponent extends React.Component {
  render() {
    return()
  }
}
*/

const LoginTwo = () => {
  //console.log("window.MyVars.loggedIn:"+window.MyVars.loggedIn)

  //const user = useContext(UserContext)
  //console.log(user) // { name: 'Tania', loggedIn: true }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");
  {/*
    s@s.com
    ssssss
    */}
    const handleForm = e => {
      e.preventDefault();
      firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {

        console.log("res:"+JSON.stringify(res))
        var user = firebase.auth().currentUser;

        if (res.user) {
          if (user) {
            // User is signed in.
            console.log("LOGIN.JS -> user signed in:"+JSON.stringify(user));
          } else {
            console.log("LGOIN.js -> user NOT signed in.");
            // No user is signed in.
          }
          history.push('/admin/videos')

          //window.location.replace('/admin/videos');
          //<Redirect from="/" to="/admin/videos" />
          //setTimeout(
          //  function() {
          //    window.location.replace('/admin/videos');
          //  }, 2000);

        }else{

        }
        //console.log("USER NOW:"+JSON.stringify(user));
        //window.location.replace('/admin/record');
      })
      .catch(e => {
        setErrors(e.message);
      });
    };

    if(true){
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
            //window.MyVars.loggedIn = false;
            //console.log("window.MyVars.loggedIn:"+window.MyVars.loggedIn)

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
