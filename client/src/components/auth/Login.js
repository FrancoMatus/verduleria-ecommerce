import {
  Button,
  Grid,
  Container,
  makeStyles,
  Paper,
  Avatar,
  Typography,
  Box,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import LockIcon from "@material-ui/icons/Lock";
import { MAIN_COLOR } from "../../Constants";
import { useDispatch, useSelector } from "react-redux";
import { handleCloseAlert, loginUser } from "../../redux/actions/users";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  justifyCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paperStyles: {
    padding: "20px",
    height: 260,
    width: "280px",
    margin: "24px auto",
    borderRadius: "1px solid #666366",
  },
  GridContainer: {
    display: "flex",
    alignItems: "center",
    margin: "auto",
  },
  textStyle: {
    marginLeft: 12,
  },
  inputStyle: {
    marginBottom: 8,
  },
  buttonStyles: {
    margin: 16,
    color: "white",
    backgroundColor: MAIN_COLOR,
  },
  buttonBackStyles: {
    margin: "24px 0px",
  },
}));

const Login = () => {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  console.log("Algo: ");
  const history = useHistory();
  const { alertMessage, errorMessageLogin, statusMessage } = useSelector(
    (state) => state.users
  );
  const [openAlert, setOpenAlert] = useState(false);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(loginUser(user));
  };

  console.log(statusMessage);

  const openAlertMessages = () => {
    setOpenAlert(true);
  };

  useEffect(() => {
    if (alertMessage && statusMessage) {
      setTimeout(() => {
        openAlertMessages();
      }, 1);
    }
    if (openAlert) {
      setTimeout(() => {
        dispatch(handleCloseAlert());
      }, 2000);
    }
    if (statusMessage === "success") {
      setTimeout(() => {
        history.push("/");
      }, 2101);
    }
  }, [alertMessage, openAlert, statusMessage, dispatch, history]);

  useEffect(() => {
    if (errorMessageLogin && statusMessage) {
      setTimeout(() => {
        dispatch(handleCloseAlert());
      }, 2100);
    }
  }, [errorMessageLogin, dispatch, statusMessage]);

  const { email, password } = user;
  console.log("asdasd: ", errorMessageLogin);
  return (
    <>
      <Button
        className={classes.buttonBackStyles}
        startIcon={<ArrowBackIcon />}
        variant="text"
        onClick={() => history.push("/")}
      >
        Volver al inicio
      </Button>
      <Grid container>
        {openAlert && (
          <Grid className={classes.root}>
            <Alert severity={statusMessage}>{alertMessage}</Alert>
          </Grid>
        )}
        {errorMessageLogin && (
          <Grid className={classes.root}>
            <Alert severity="error">{errorMessageLogin}</Alert>
          </Grid>
        )}
        <Paper className={classes.paperStyles}>
          <Grid className={classes.GridContainer}>
            <Avatar>
              <LockIcon />
            </Avatar>
            <Typography className={classes.textStyle} component="div">
              <Box fontWeight="fontWeightBold">Ingresar</Box>
            </Typography>
          </Grid>
          <Container className={classes.justifyCenter}>
            <ValidatorForm onSubmit={handleSubmit}>
              <TextValidator
                className={classes.inputStyle}
                label="Email"
                onChange={handleInputChange}
                name="email"
                value={email}
                validators={["required", "isEmail"]}
                errorMessages={["Campo requerido", "El email no es válido"]}
              />
              <TextValidator
                className={classes.inputStyle}
                label="Contraseña"
                onChange={handleInputChange}
                type="password"
                name="password"
                value={password}
                validators={["required"]}
                errorMessages={["Campo requerido"]}
              />
              <Button
                className={classes.buttonStyles}
                variant="contained"
                type="submit"
              >
                Login
              </Button>
            </ValidatorForm>
          </Container>
          <Typography component="div">
            ¿No posees una cuenta?
            <Box fontWeight="fontWeightBold">
              <Link to="/register" variant="text" color="blue">
                Pincha aquí
              </Link>{" "}
              para registrarte
            </Box>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default Login;
