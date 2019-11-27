import React, { useEffect } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Link from "@material-ui/core/Link";
import Checkbox  from '@material-ui/core/Checkbox';

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import {
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode,
  FirebaseDatabaseMutation
} from "@react-firebase/database";
import * as firebase from "firebase/app";
import "firebase/database";


import fire from './fire';

// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyles = makeStyles(styles);



function goGetIt(){
  return [];
}

function initSelected(table){
  var tempA = []
  var index;
  for (index in table){
    if (table[index].is_graded){
      tempA.push(index)
    }
  }
  return table;
}

const path = "TEST_NAMESPACE/user_bookmarks";

default export const App = () => (
  <div style={styles}>
    <FirebaseDatabaseProvider firebase={firebase} {...config}>
      <div>
        Data in <pre>user_bookmarks</pre>
      </div>
      <MutationExample />
    </FirebaseDatabaseProvider>
  </div>
);

class MutationExample extends React.Component {
  state = {
    pushedKey: ""
  };
  render() {
    const { state } = this;
    return (
      <React.Fragment>
        <FirebaseDatabaseMutation type="push" path={path}>
          {({ runMutation }) => {
            return (
              <div>
                <button
                  data-testid="test-push"
                  onClick={async () => {
                    const { key } = await runMutation({ TEST: "DATA" });
                    this.setState({ pushedKey: key });
                  }}
                >
                  Push
                </button>
              </div>
            );
          }}
        </FirebaseDatabaseMutation>
        {state.pushedKey !== "" && (
          <div>
            <div data-testid="test-push-result">{state.pushedKey}</div>
            <div>
              <FirebaseDatabaseNode path={`${path}/${state.pushedKey}`}>
                {({ value }) => <pre>{s(value)}</pre>}
              </FirebaseDatabaseNode>
              <FirebaseDatabaseMutation
                type="set"
                path={`${path}/${state.pushedKey}`}
              >
                {({ runMutation }) => (
                  <button
                    onClick={async () => {
                      runMutation(null);
                      this.setState({ pushedKey: "" });
                    }}
                  >
                    Delete
                  </button>
                )}
              </FirebaseDatabaseMutation>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

function CustomTable(props) {
  console.log("props at init:"+JSON.stringify(props))

  useEffect(() => {
    console.log("UseEffect Called")
    setSelected(initSelected(props.tableData));
    console.log("SELECTED:"+JSON.stringify(selected))
  }, []);

  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  const [state, setState] = React.useState({
    checkedGraded: true
  });
  const [selected, setSelected] = React.useState(goGetIt());

  const handleChange = rowNum => event => {
    const selectedIndex = selected.indexOf(rowNum);
    console.log("name:"+rowNum+" selected:"+JSON.stringify(selected))
    let newSelected = [];
    //setState({ ...state, [name]: event.target.checked });
  };

  const handleClick = (rowNum) => event =>{
    const selectedIndex = selected.indexOf(rowNum);
    let newSelected = [];
    //console.log("rowNum:"+rowNum+" selected:"+JSON.stringify(isChecked)+" selectedIndex:"+selectedIndex)
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, rowNum);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    console.log("newSelected:"+JSON.stringify(newSelected))
    setSelected(newSelected);
  };
  const isSelected = id => selected.indexOf(id) !== -1;

  console.log("print:"+JSON.stringify(selected))

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
      console.log("PROP NOW:"+prop+" keyNOW:"+key);
      let rowKey = key;
      const isItemSelected = isSelected(rowKey);
      console.log("isItemSelected:"+isItemSelected)
      return (
        <TableRow key={key} className={classes.tableBodyRow}>

        {prop.map((prop, key) => {
          if (prop.hasOwnProperty('is_graded')) return (
            <TableCell className={classes.tableCell} key={key}>
            <Checkbox
            key={key}
            checked = {isItemSelected}
            color="default"
            onChange={handleClick(rowKey)}
            value={isItemSelected}
            inputProps={{
              'aria-label': 'checkbox with default color',
            }}
            />
            </TableCell>
          );

          if (!prop.is_url) return (
            <TableCell className={classes.tableCell} key={key}>
            {prop}


            </TableCell>

          );

          if (prop.is_url) return(
            <TableCell className={classes.tableCell} key={key}>
            <a href={prop.url}>Video Link</a>
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
