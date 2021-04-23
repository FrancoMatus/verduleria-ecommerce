import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MailIcon from "@material-ui/icons/Mail";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { getUserProfileData, logoutUser } from "../../redux/actions/users";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { Box, Button, Grid } from "@material-ui/core";
import { MAIN_COLOR } from "../../Constants";
import { useHistory } from "react-router";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    display: "flex",
    justifyContent: "center",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  large: {
    marginTop: "0px",
    marginBottom: "12px",
    margin: "auto auto",
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  gridContainerTitle: {
    color: MAIN_COLOR,
    margin: "16px auto",
  },
  gridContainerStyle: {
    margin: "12px auto",
  },
  gridItemStyles: {
    display: "flex",
    alignItems: "left",
  },
  gridButtonLogout: {
    marginLeft: 0,
  },
}));

const HomeProfile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const userProfile = useSelector((state) => state.users.userProfile);

  console.log("User profile data: ", userProfile);

  const { firstName, lastName, username, email, phone } = userProfile;

  useEffect(() => {
    dispatch(getUserProfileData());
    if (!JSON.parse(localStorage.getItem("userToken"))) {
      history.push("/");
    }
  }, [dispatch, history]);

  return (
    <Grid className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography edge="start" variant="h6" noWrap>
            {`${firstName} ${lastName}`}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Button
          className={classes.buttonBackStyles}
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => history.push("/")}
        >
          Volver al inicio
        </Button>
        <Grid className={classes.toolbar} />

        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          className={classes.large}
        />
        <Typography component="div">
          <Box fontWeight="fontWeightBold">@{username}</Box>
        </Typography>
        <Divider />
        <Grid className={classes.gridContainerStyle}>
          <Typography
            component="div"
            variant="body1"
            className={classes.gridContainerTitle}
          >
            <Box fontWeight="fontWeightBold">Datos de contacto</Box>
          </Typography>
          <Grid>
            <Grid className={classes.gridItemStyles}>
              <MailIcon /> {email}
            </Grid>
            <Grid className={classes.gridItemStyles}>
              <PhoneAndroidIcon /> {phone}
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid>
          <Button
            startIcon={<ExitToAppIcon />}
            variant="text"
            className={classes.gridButtonLogout}
            onClick={() => {
              dispatch(logoutUser());
              history.push("/");
            }}
          >
            Cerrar sesión
          </Button>
        </Grid>
      </Drawer>
      <Grid className={classes.content}>
        <Grid className={classes.toolbar} />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Grid>
    </Grid>
  );
};
export default HomeProfile;
