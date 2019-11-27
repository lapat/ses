import React, { Component, useEffect }  from 'react';
// @material-ui/core components
import {
  useFirestore,
  FirebaseAppProvider,
  useFirestoreDocData,
  useFirestoreCollectionData,
  SuspenseWithPerf
} from 'reactfire';
import 'firebase/performance';

import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import fire from 'fire';
var firestore = fire.firestore();
var docRef = firestore.collection("users");
//...
function Burrito() {
  // lazy load the Firestore SDK
  const firestore = useFirestore();

  // create a document reference
  const burritoRef = firestore()
    .collection('users')
    .doc('a');

  // subscribe to the doc. just one line!
  const burrito = useFirestoreDocData(burritoRef);

  // get the value from the doc
  const isYummy = burrito.yummy;

  return <p>The burrito is {burrito.speed}</p>;
}

function Tester() {
  return (
    <div className="App">
          <SuspenseWithPerf
            fallback={'loading burrito status...'}
            traceId={'load-burrito-status'}
          >
            <Burrito />
          </SuspenseWithPerf>
        </div>
    );
}

export default function tableWrapper(){
  return (
    <div className="App">
          <SuspenseWithPerf
            fallback={'loading burrito status...'}
            traceId={'load-burrito-status'}
          >
            <TableList />
          </SuspenseWithPerf>
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
  for (index in videoData){
    var isGraded = "Yes";
    if (videoData[index].grade){
      isGraded = "No"
    }
    var row = [
      videoData[index].name,
      videoData[index].email,
      {is_url : true, url : videoData[index].video_link},
      {is_graded : videoData[index].graded}
    ]
    tableArray.push(row)
  }
  return tableArray;
}

function TableList() {
  const classes = useStyles();
  // lazy load the Firestore SDK
  const firestore = useFirestore();

  // create a document reference
  const videosRef = firestore().collection('videos');

  // subscribe to the doc. just one line!
  const video = useFirestoreCollectionData(videosRef);
  const videoTableMapped = mapDataToTable(video)
  //console.log("VIDEO:"+JSON.stringify(videoTableMapped))
  return (
    <GridContainer>

      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Table on Plain Background
            </h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Name", "Email", "Video Link", "Graded"]}
              tableData={videoTableMapped}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
