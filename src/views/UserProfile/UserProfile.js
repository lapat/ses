import React, { Component, useEffect }  from 'react';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Table from "components/Table/Table.js";

import * as firebase from 'firebase'
import avatar from "assets/img/faces/marc.jpg";

var firestore = firebase.firestore();
var docRef = firestore.collection("users");
var db = firebase.firestore();

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function userWrapper(){
  return (
    <div className="App">

    <UserProfile />
    </div>
  );
}

function mapDataToUserTable(userData){
  var index;
  var tableArray= []
  //console.log("VIDEODATE:"+JSON.stringify(userData))
  for (index in userData){

    var row = [
      userData[index].name,
      userData[index].email
    ]
    tableArray.push(row)
  }
  console.log("mapDataToUserTable TABLEARAY:"+JSON.stringify(tableArray))

  return tableArray;
}

function mapDataToStudentAndGraderTable(userData){
  var index;
  var tableArray= []
  //console.log("VIDEODATE:"+JSON.stringify(userData))
  for (var index in userData){
    if (userData[index].hasOwnProperty('students')){

    var row = [
      {bold_markup : userData[index].name},
      {bold_markup : userData[index].email},
      {type : 'grader'}
    ]
    tableArray.push(row)

      console.log("FOUND STUDENTS...")
      var students = userData[index].students
      for (var sIndex in students){
        var thisStudent = students[sIndex];
        var row = [
          thisStudent.name,
          thisStudent.email,
          {type : 'student'}
        ]
        tableArray.push(row)
      }
    }
  }
  console.log("mapDataToStudentAndGraderTable TABLEARAY:"+JSON.stringify(tableArray))
  return tableArray;
}

function isAdminFun(user){
  console.log("isAdminFun user:"+JSON.stringify(user))
  if (user.hasOwnProperty('user')){
    if (user.user.type === 'admin'){
      return true;
    }
  }
  return false;
}

function UserProfile() {
  const classes = useStyles();
  const [user, setUser] = React.useState({});
  const [graders, setGraders] = React.useState([]);
  const [studentsAndGraders, setStudentsAndGraders] = React.useState([]);
  var graderArray=[]
  var graderWithStudentsArray=[]
  useEffect(() => {
    var user = firebase.auth().currentUser;
    if (user) {
      console.log("User signed in:"+JSON.stringify(user));
    } else {
      console.log("User NOT signed in.");
    }

    let doc = db.collection('users').where('fb_uid', '==', user.uid);
    let observer = doc.onSnapshot(querySnapshot => {
      console.log(`Received query snapshot of size ${querySnapshot.size}`);
      //console.log("Q:"+JSON.stringify(querySnapshot))

      querySnapshot.forEach(function(thisUser) {
        //console.log(JSON.stringify(thisUser.data()))
        setUser(thisUser.data())

        console.log("this user:"+JSON.stringify(thisUser.data()))
        if (thisUser.data().type ==='admin'){
          if (thisUser.data().hasOwnProperty('graders')){
            /*Get All The Graders For This Admin*/
            for (var index in thisUser.data().graders){
              var graderUID = thisUser.data().graders[index];
              console.log("graderUID:"+graderUID)
              let docGraders = db.collection('users').doc(graderUID);
              let observer = docGraders.onSnapshot(docSnapshot => {
                console.log('Received doc snapshot'+JSON.stringify(docSnapshot.data()));
                var isUpdate = false;
                for (var gIndex in graderArray){
                  if (graderArray[gIndex].fb_uid === docSnapshot.data().fb_uid){
                    console.log("UPDATE!!!!")
                    graderArray[gIndex]=docSnapshot.data();
                    isUpdate = true;
                  }
                }
                if (!isUpdate){
                  graderArray.push(docSnapshot.data())
                  /*var graderAndStudents = {grader : docSnapshot.data(), students : []}
                  for (var gIn in docSnapshot.data().students){
                  var aStudent_fb_uid = docSnapshot.data().students[gIn];
                  console.log("STUDENT UID:"+aStudent_fb_uid)
                  let docStudents = db.collection('users').doc(aStudent_fb_uid);
                  let observerStudent = docStudents.onSnapshot(docSnapshotStudent => {
                  console.log("PUSHING .... "+JSON.stringify(docSnapshotStudent.data()))
                  graderAndStudents['students'].push(docSnapshotStudent.data())
                  graderWithStudentsArray.push(graderAndStudents)
                  setStudentsAndGraders(mapDataToStudentAndGraderTable(graderWithStudentsArray))
                })
              }*/
            }


            setGraders(mapDataToUserTable(graderArray))
            setStudentsAndGraders(mapDataToStudentAndGraderTable(graderArray))
            /*Get All The Students For This Grader For This Admin*/
            /*for (var gIndexTwo in graderArray){
            console.log("grader:"+graderArray[gIndexTwo].fb_uid)
            let docStudent = db.collection('users').doc(graderArray[gIndexTwo].fb_uid);
            let observerStudent = docStudent.onSnapshot(docSnapshotStudent => {
            console.log("STUDENT OF GRADER:"+JSON.stringify(docSnapshotStudent.data()))
          })
        }*/

      }, err => {
        console.log(`Encountered error: ${err}`);
      });

      /*let docGraders = db.collection('users').where('fb_uid', '==', graderUID);
      let observerGraders = docGraders.onSnapshot(querySnapshotGraders => {
      console.log(`Received query snapshot of size ${querySnapshotGraders.size}`);
      querySnapshotGraders.forEach(function(thisGrader) {
      console.log("GRADER:"+JSON.stringify(thisGrader.data()))
      graders.push(thisGrader.data())
    })
    setGraders(mapDataToUserTable(graders));
  })
  */
}
console.log("graders:"+JSON.stringify(graders))
}
}
})
})
}, []);

const isAdmin = isAdminFun({user})


 return (
  <div>
  <GridContainer>

  <GridItem xs={12} sm={12} md={4}>
  <Card profile>
  {/*
    <CardAvatar profile>
    <a href="#pablo" onClick={e => e.preventDefault()}>
    <img src={avatar} alt="..." />
    </a>
    </CardAvatar>
    */}
    <CardBody profile>


      <h5 className={classes.cardCategory}>{user.name} - {user.type}</h5>
      <h6 className={classes.cardTitle}>{user.school}</h6>
      <h6 className={classes.cardTitle}>{user.email}</h6>


    {/*<p className={classes.description}>
    Don{"'"}t be scared of the truth because we need to restart the
    human foundation in truth And I love you like Kanye loves Kanye
    I love Rick Owens’ bed design but the back is...
    </p>
    <Button color="primary" round>
    Follow
    </Button>*/}
    </CardBody>
    </Card>
    </GridItem>


    {isAdmin ? (
      <React.Fragment>
      <GridItem xs={12} sm={12} md={12}>
      <Card plain>
      <CardHeader plain color="primary">
      <h4 className={classes.cardTitleWhite}>
        Your Graders
      </h4>
      <p className={classes.cardCategoryWhite}>
      </p>
      </CardHeader>
      <CardBody>
    <Table
    tableHeaderColor="primary"
    tableHead={["Name", "Email"]}
    tableData={graders}
    />
    </CardBody>
    </Card>
    </GridItem>




    <GridItem xs={12} sm={12} md={12}>
    <Card plain>
    <CardHeader plain color="primary">
    <h4 className={classes.cardTitleWhite}>
    Graders with Students
    </h4>
    <p className={classes.cardCategoryWhite}>

    </p>
    </CardHeader>
    <CardBody>
    <Table
    tableHeaderColor="primary"
    tableHead={["Name", "Email", "Type"]}
    tableData={studentsAndGraders}
    />
    </CardBody>
    </Card>
    </GridItem>

    </React.Fragment>
  )  : null}



    </GridContainer>
    </div>
  );
}
