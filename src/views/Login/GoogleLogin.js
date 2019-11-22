import React, { Component } from 'react';
import ReactDOM from "react-dom";
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


import * as firebase from 'firebase/app';
import fire from 'fire';
var firestore = fire.firestore();


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
var docRef = firestore.collection("users");

export const AuthContext = React.createContext(null);




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

const UnAuthedPage = () => {
  return (
    <State initial={{ isLoading: false, error: null }}>
      {({ state, setState }) => (
        <div
          style={{
            width: 600,
            height: 300,
            display: "flex",
            alignContent: "center",
            justifyContent: "space-around",
            flexDirection: "column"
          }}
        >
          <div>isLoading : {JSON.stringify(state.isLoading)}</div>
          <div>error : {JSON.stringify(state.error)}</div>

          <Button
            {...getButtonStyleProps()}
            onClick={async () => {
              try {
                setState({ isLoading: true, error: null });
                const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                await firebase.auth().signInWithPopup(googleAuthProvider);
                // setState({ isLoading: false, error: null });
              } catch (error) {
                setState({ isLoading: false, error: error });
              }
            }}
          >
          Google Signin
          </Button>
          <Button
            {...getButtonStyleProps()}
            onClick={async () => {
              try {
                setState({ isLoading: true, error: null });
                const emailAuthProvider = new firebase.auth.EmailAuthProvider();
                await firebase.auth().signInWithPopup(emailAuthProvider);
                // setState({ isLoading: false, error: null });
              } catch (error) {
                setState({ isLoading: false, error: error });
              }
            }}
          >
          Email/Password Signin
          </Button>
        </div>
      )}
    </State>
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

class AuthedPage extends React.Component {
  newLinkTextFieldRef = React.createRef();
  newLinkMetaTextFieldRef = React.createRef();
  render() {
    return (
      <>
        <div style={{ width: "80%" }}>
          <div style={{ width: "100%" }}>
            <Header
              renderLogout={() => (
                <Button
                  {...getButtonStyleProps()}
                  onClick={async () => {
                    await firebase
                      .app()
                      .auth()
                      .signOut();
                  }}
                >
                  Sign Out
                </Button>
              )}
              shit
            />
          </div>


        </div>
      </>
    );
  }
}

const GoogleLogin = () => {

  return (
      <FirebaseAuthProvider {...config} firebase={firebase}>

        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            background: "#ECEFF1"
          }}
        >
          <IfFirebaseUnAuthed>
            <UnAuthedPage />
          </IfFirebaseUnAuthed>
          <IfFirebaseAuthed>{() => <AuthedPage />}</IfFirebaseAuthed>
        </div>
      </FirebaseAuthProvider>
    );
}


export default GoogleLogin;
