/*
ListX is a generic List processing component
Usage:
<ListX 
  itemData={
    includeAll: <bool>.
    titles: <bool>, //list of titles to be displayed
    returnSelection: (index) => {}
    returnList: (indexes) => {} //display checkboxes
  }
  height: <Number>,
  width: <Number>,
  itemSize: <Number>,
  itemCount: <Number>
/>

  [react-window](https://react-window.now.sh/#/api/FixedSizeList)
*/

import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { FixedSizeList } from "react-window";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import { Button } from "@material-ui/core";

const cl = console.log.bind(console);
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: 200,
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  listEntry: {
    boxSizing: "borderBox",
    backgroundColor: "#f0f0f0",
    border: "4px solid white",
    padding: "4px",
    margin: "10px"
  }
}));

function Row(props) {
  const { index, style, data } = props;
  const classes = useStyles();
  const [rev, setRev] = React.useState(1);
  const [checkedList] = React.useState([]);
  const labelId =
    (data.titles && data.titles[index]) || `checkbox-list-label-${index}`;
  const itemText = (data.titles && data.titles[index]) || `Item ${index + 1}`;

  const handleToggle = value => () => {
    if (checkedList[index]) {
      checkedList[index] = undefined;
    } else {
      checkedList[index] = index + 1;
    }
    setRev(rev + 1); // force redisplay
    data.returnList(checkedList);
  };

  return (
    <React.Fragment>
      {data.includeAll || checkedList[index] ? (
        <ListItem
          button
          style={style}
          className={classes.listEntry}
          key={index}
          onClick={handleToggle(index)}
        >
          {data.returnList ? (
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checkedList[index] === index + 1}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
          ) : (
            ""
          )}

          <ListItemText primary={itemText} />
        </ListItem>
      ) : (
        undefined
      )}
    </React.Fragment>
  );
}

Row.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired
};

export default function VirtualizedList(props) {
  const listProps = {
    height: 200,
    width: 300,
    itemSize: 40,
    itemCount: 200,
    itemStyle: { color: "red" },
    itemData: {
      includeAll: true,
      titles: ["This is the first", "this is the second", "this is the third"],
      returnList: list => {
        setList([...list]);
      }
    },
    ...props
  };
  const classes = useStyles();
  const [itemData, setItemData] = React.useState(listProps.itemData);
  const [list, setList] = React.useState([]);
  const buttonToggle = () => {
    const newData = { ...itemData };
    newData.includeAll = !itemData.includeAll;
    setItemData(newData);
  };
  return (
    <div className={classes.root}>
      <FixedSizeList
        {...listProps}
        itemCount={itemData.titles.length}
        itemData={itemData}
      >
        {Row}
      </FixedSizeList>
      <Button onClick={buttonToggle} color="primary">
        Checked Only
      </Button>
      {JSON.stringify(list.filter(el => el !== undefined))}
    </div>
  );
}
