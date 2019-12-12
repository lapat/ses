import React, { Component, useEffect }  from 'react';
// @material-ui/core components

import 'firebase/performance';
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed
} from "@react-firebase/auth";

import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import * as firebase from 'firebase'
var firestore = firebase.firestore();
var docRef = firestore.collection("users");
var db = firebase.firestore();


//...



export default function tableWrapper(){
  return (
    <div className="App">

    <TableList />
    </div>
  );
}

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};
const useStyles = makeStyles(styles);

function mapDataToTable(videoData){
  var index;
  var tableArray= []
  //console.log("VIDEODATE:"+JSON.stringify(videoData))
  for (index in videoData){

    var row = [
      videoData[index].name,
      videoData[index].email,
      {is_url : true, url : videoData[index].video_link},
      {is_graded : videoData[index].graded, id :videoData[index].id},
    ]
    tableArray.push(row)
  }
  return tableArray;
}



function TableList() {
  const classes = useStyles();
  const [videos, setVideos] = React.useState([]);
  var videosTwo =  [];
  var videoTableMappedTwo = [];
  useEffect(() => {
    var user = firebase.auth().currentUser;
    if (user) {
      console.log("user signed in:"+JSON.stringify(user));
    } else {
      console.log("user NOT signed in.");
    }

    let doc = db.collection('videos').where('group', '==', 'a');
    let observer = doc.onSnapshot(querySnapshot => {
    console.log(`Received query snapshot of size ${querySnapshot.size}`);
    //console.log("Q:"+JSON.stringify(querySnapshot))
    if (videosTwo.length===0){
      querySnapshot.forEach(function(video) {
        videosTwo.push(video.data())
      })
      videoTableMappedTwo = mapDataToTable(videosTwo)
      //console.log("J:"+JSON.stringify(videoTableMappedTwo))
      setVideos(videoTableMappedTwo)
    }else{
      videosTwo=[]
      querySnapshot.forEach(function(video) {
        //console.log("video:"+JSON.stringify(video))
        videosTwo.push(video.data())
      })
      videoTableMappedTwo = mapDataToTable(videosTwo)
      setVideos(videoTableMappedTwo)

      //to do - handle real time updates?
    }
    // ...
  }, err => {
    console.log(`Encountered error: ${err}`);
  });
}, []);


return (
  <GridContainer>

  <GridItem xs={12} sm={12} md={12}>
  <Card plain>
  <CardHeader plain color="primary">
  <h4 className={classes.cardTitleWhite}>
  Videos Submitted By Students
  </h4>
  <p className={classes.cardCategoryWhite}>

  </p>
  </CardHeader>
  <CardBody>
  <Table
  tableHeaderColor="primary"
  tableHead={["Name", "Email", "Video Link", "Graded"]}
  tableData={videos}
  />
  </CardBody>
  </Card>
  </GridItem>
  </GridContainer>
);
}
