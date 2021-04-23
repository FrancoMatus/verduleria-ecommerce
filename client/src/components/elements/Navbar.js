import React, { useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  InputBase,
  Typography,
  Toolbar,
  IconButton,
  AppBar,
} from "@material-ui/core";
import { useHistory } from "react-router";
import { logoutUser } from "../../redux/actions/users";
import { useDispatch } from "react-redux";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

require("dotenv").config();

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  whiteColor: {
    color: "white",
  },
  buttonStyle: {
    color: "white",
  },
  buttonStyleHome: {
    color: "white",
    fontSize: 24,
  },
}));

const NavBar = ({ userData }) => {
  const username = userData?.username;
  const adminValidate = userData?.isAdmin;
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!userData) {
      setAnchorEl(null);
    }
  }, [userData]);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => history.push("/profile")}>Perfil</MenuItem>
      <MenuItem onClick={handleMenuClose}>Mi cuenta</MenuItem>
      <MenuItem
        onClick={() => {
          dispatch(logoutUser());
          setAnchorEl(null);
        }}
      >
        Cerrar sesión
      </MenuItem>
    </Menu>
  );

  return (
    <Grid className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Button
            onClick={() => history.push("")}
            className={classes.buttonStyleHome}
          >
            INICIO
          </Button>
          <Grid className={classes.search}>
            <Grid className={classes.searchIcon}>
              <SearchIcon />
            </Grid>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </Grid>
          <Grid className={classes.grow} />
          <Grid className={classes.sectionDesktop}>
            {adminValidate && (
              <Button
                variant="text"
                startIcon={<LockOpenIcon />}
                onClick={() => history.push("/admin/dashboard")}
                className={classes.buttonStyle}
              >
                ADMINISTRACIÓN
              </Button>
            )}
            <Button variant="text" startIcon={<AddShoppingCartIcon />} onClick={() => history.push("/cart")}>
              Carrito
            </Button>
            {username ? (
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
                <Typography component="div">
                  <Box fontWeight="fontWeightBold">{username}</Box>
                </Typography>
              </IconButton>
            ) : (
              <>
                <Button
                  variant="text"
                  className={classes.whiteColor}
                  onClick={() => history.push("/login")}
                >
                  Login
                </Button>
                <Button
                  variant="text"
                  className={classes.whiteColor}
                  onClick={() => history.push("/register")}
                >
                  Register
                </Button>
              </>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Grid>
  );
};

export default NavBar;
