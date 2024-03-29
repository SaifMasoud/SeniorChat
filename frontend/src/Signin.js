import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import styled from "styled-components";
import needle from "needle";

const Button = styled.button`
  background-color: #4285F4;
  color: white;
  padding: 20px 15px;
  border-radius: 5px;
  outline: 0; 
  cursor: pointer;
  &:hover {
    background-color: #2979ff
  }
  font-family: sans-serif;
`

const SigninWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

`;

const SigninForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 12em;
  font-size: 24px;
`;

function Signin(props) {
    var firebaseConfig = {
      apiKey: "AIzaSyByjZezt7xhRuwoKI_GPkYNCmehUCEZj5Q",
      authDomain: "singular-coil-302002.firebaseapp.com",
      projectId: "singular-coil-302002",
      storageBucket: "singular-coil-302002.appspot.com",
      messagingSenderId: "231493844645",
      appId: "1:231493844645:web:c34bf083786205043a174c",
      measurementId: "G-G62TPJMY23"
    };

  //Initialize Firebase
  if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  function login() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    console.log(result)
    var credential = result.credential;
  
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.idToken;

    needle.post("https://96da9a70b27a.ngrok.io/api/v1/login", {
      email: result.additionalUserInfo.profile.email,
      name: result.additionalUserInfo.profile.name,
    }, {json: true}, (err, resp) => {
      if (!err && resp.statusCode == 200) {
        console.log(resp.body);
        props.setCurrent("home");
      }
    })
  
    console.log(token);
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    console.log(errorCode, errorMessage, credential)
  });
  }

    return(
      <SigninWrapper>
        <SigninForm id="login_div" className="main-div">
        <h2>Welcome to SeniorChat</h2>
        <img src="https://static.thenounproject.com/png/1032078-200.png"></img>
        <Button onClick={login}>Login using Google</Button>
        </SigninForm>
      </SigninWrapper>
    )
}

export default Signin
