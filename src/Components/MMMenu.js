import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import AccountBox from "@material-ui/icons/AccountBox";
import Mic from "@material-ui/icons/Mic";
import PermMedia from "@material-ui/icons/PermMedia";
import PlayArrow from "@material-ui/icons/PlayArrow";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
  button: {
    margin: 0
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  }
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

export default function CustomizedMenus(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = form => {
    props.changeForm(form);
    handleClose();
  };
  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <MenuIcon className={classes.centerIcon} />
      </IconButton>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={() => handleChange("login")}>
          <ListItemIcon>
            <AccountBox />
          </ListItemIcon>
          <ListItemText primary="Log in" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleChange("register")}>
          <ListItemIcon>
            <PermMedia />
          </ListItemIcon>
          <ListItemText primary="Register" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleChange("record")}>
          <ListItemIcon>
            <Mic />
          </ListItemIcon>
          <ListItemText primary="Record" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleChange("play")}>
          <ListItemIcon>
            <PlayArrow />
          </ListItemIcon>
          <ListItemText primary="Playback" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
