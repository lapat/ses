
import React, { Component } from 'react';
import ReactDOM from "react-dom";
//import { createBrowserHistory } from './history';
import history from './history';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed
} from "@react-firebase/auth";
// core components
import Admin from "layouts/Admin.js";
import { State } from "react-powerplug";

import "assets/css/material-dashboard-react.css?v=1.8.0";
import { Button, MenuItem, TextField, RootRef } from "@material-ui/core";

import Login from "views/Login/Login.js";
import GoogleLogin from "views/Login/GoogleLogin.js";

import * as firebase from 'firebase/app';


const config = {
  apiKey: "AIzaSyCi5366e-I8MXCD979TKiUxplGsSw81d0Q",
  authDomain: "videolearn-ae4bc.firebaseapp.com",
  databaseURL: "https://videolearn-ae4bc.firebaseio.com",
  projectId: "videolearn-ae4bc",
  storageBucket: "videolearn-ae4bc.appspot.com",
  messagingSenderId: "36149314389",
  appId: "1:36149314389:web:937f8bd9e4b4d8b21e65dc",
  measurementId: "G-HEXRKLHY9D"
};





const hist = history;

const IDontCareAboutFirebaseAuth = () => {
  return <div>This part won't react to firebase auth changes</div>;
};



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

const getCenterChildrenStyle = () => {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };
};

const RowWithRightAlignedContent = ({ children }) => {
  return (
    <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "flex-end"
    }}
    >
    {children}
    </div>
  );
};


export type HeaderProps = {
  renderLogout: () => React.ReactNode;
};
const Header = ({
  renderLogout = () => null,
}: HeaderProps) => {
  return (
    <div
    style={{
      height: 100,
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}
    >
    <div
    style={{
      height: 200,
      width: "40%",
      alignSelf: "center",
      ...getCenterChildrenStyle()
    }}
    >
    FUCK
    </div>
    <div
    style={{
      height: 200,
      width: "30%",
      ...getCenterChildrenStyle()
    }}
    >
    {renderLogout()}
    </div>
    </div>
  );
};



class CheckSignedInFB extends React.Component {
  render() {
    return (

      <FirebaseAuthConsumer>
      {({ isSignedIn, firebase }) => {
        console.log("isSignedIn:"+isSignedIn)
        if (isSignedIn === true) {
          return (
            <Router history={hist}>
            {console.log("hist:"+JSON.stringify(hist))}
            <Switch>
            <Route path="/admin" component={Admin} />
            <Redirect from="/" to="/admin/table" />
            </Switch>
            </Router>
          );
        } else {
          return (
            <Login>
            </Login>
          );
        }
      }}
      </FirebaseAuthConsumer>
    )
  }
}

class CheckSignedIn extends React.Component {
  render() {
    if(true){
      return (
        <Router history={hist}>
        {console.log("hist:"+JSON.stringify(hist))}
        <Switch>
        <Route path="/admin" component={Admin} />
        <Redirect from="/" to="/admin/table" />
        </Switch>
        </Router>
      )
    }else{
      return(
        <Login>
        </Login>
      )
    }
  }
}



ReactDOM.render(
  <FirebaseAuthProvider  {...config} firebase={firebase}>
    <CheckSignedInFB>
  </CheckSignedInFB>
  </FirebaseAuthProvider>,
  document.getElementById("root")
);
