import React, { useEffect } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Link from "@material-ui/core/Link";
import Checkbox  from '@material-ui/core/Checkbox';
import "assets/css/material-dashboard-react.css?v=1.8.0";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import {
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode,
  FirebaseDatabaseMutation
} from "@react-firebase/database";


import * as firebase from "firebase";
import "firebase/database";
//Why can't I remove this next line?  I thought this was already inited in index.js????
import fire from 'fire';

// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
var db = firebase.firestore();

const useStyles = makeStyles(styles);


function initSelected(table){
  //console.log("initSelected called table:"+JSON.stringify(table))
  var tempA = []
  var index;
  for (index in table){
    //console.log("ti:"+JSON.stringify(table[index]))
    if (table[index].is_graded){
      console.log("IS GRADED..."+table[index].is_graded)
      tempA.push(index)
    }
  }
  return table;
}

const path = "TEST_NAMESPACE/user_bookmarks";

 export default function CustomTable(props) {
  //console.log("props at init:"+JSON.stringify(props))
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;


  const handleClick = (rowNum, thisProp) => event =>{
    let videosRef = db.collection('videos').doc(thisProp.id);
    let setWithOptions = videosRef.set({
      graded: !thisProp.is_graded
    }, {merge: true});

  };

  useEffect(() => {

  }, []);


  return (
    <div className={classes.tableResponsive}>
    <Table className={classes.table} >
    {tableHead !== undefined ? (
      <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
      <TableRow className={classes.tableHeadRow}>
      {tableHead.map((prop, key) => {
        return (
          <TableCell
          className={classes.tableCell + " " + classes.tableHeadCell}
          key={key}
          href="https://google.com"
          >
          {prop}
          </TableCell>
        );
      })}
      </TableRow>
      </TableHead>
    ) : null}
    <TableBody>
    {tableData.map((prop, key) => {
      let rowKey = key;
      return (
        <TableRow key={key} className={classes.tableBodyRow}>
        {prop.map((prop, key) => {
          if (prop.hasOwnProperty('is_graded')) return (
            <TableCell className={classes.tableCell} key={key}>
            <Checkbox
            key={key}
            checked = {prop.is_graded}
            color="default"
            onChange={handleClick(rowKey, prop)}
            value={prop.is_graded}
            inputProps={{
              'aria-label': 'checkbox with default color',
            }}
            />
            </TableCell>
          );

          if (prop.hasOwnProperty('type') && prop.type === 'student') return (
              <TableCell className={classes.tableCell} key={key}>
                {prop.type}
            </TableCell>
          );

          if (prop.hasOwnProperty('type') && prop.type === 'grader') return (
              <TableCell className={classes.tableCell} key={key}>
              <mybold>
                {prop.type}
                </mybold>
            </TableCell>
          );

          if (prop.hasOwnProperty('bold_markup')) return (
            <TableCell className={classes.tableCell} key={key}>
            <mybold>
              {prop.bold_markup}
              </mybold>
            </TableCell>
          );

          if (prop.is_url) return(
            <TableCell className={classes.tableCell + ' ' + 'fff'} key={key}>

              <a href={prop.url}>Video Link</a>
            </TableCell>
          );



          {/*if (!prop.is_url) return (
            <TableCell className={classes.tableCell} key={key}>
              {prop}
            </TableCell>

          );
          */}

          return (
            <TableCell className={classes.tableCell} key={key}>
              {prop}
            </TableCell>

          );


        })}
        </TableRow>
      );
    })}
    </TableBody>
    </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
