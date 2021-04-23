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
import LockIcon from "@material-ui/icons/Lock";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { MAIN_COLOR } from "../../Constants";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, handleCloseAlert } from "../../redux/actions/users";
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
    height: 490,
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

const Register = () => {
  const classes = useStyles();
  const [user, setUser] = useState({ isAdmin: true });
  const dispatch = useDispatch();
  const history = useHistory();
  const alertMessage = useSelector((state) => state.users.alertMessage);
  const statusMessage = useSelector((state) => state.users.statusMessage);
  const [openAlert, setOpenAlert] = useState(false);
  console.log("Entrando");
  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });

    console.log(user);
  };
  const handleSubmit = () => {
    dispatch(registerUser(user));
  };

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

  const { firstName, lastName, username, email, password, phone } = user;
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
      <Grid>
        {openAlert && (
          <Grid className={classes.root}>
            <Alert severity={statusMessage}>{alertMessage}</Alert>
          </Grid>
        )}
        <Paper className={classes.paperStyles}>
          <Grid className={classes.GridContainer}>
            <Avatar>
              <LockIcon />
            </Avatar>
            <Typography className={classes.textStyle} component="div">
              <Box fontWeight="fontWeightBold">Registrarse</Box>
            </Typography>
          </Grid>
          <Container className={classes.justifyCenter}>
            <ValidatorForm onSubmit={handleSubmit}>
              <TextValidator
                className={classes.inputStyle}
                label="Nombre"
                onChange={handleInputChange}
                name="firstName"
                defaultValue={""}
                value={firstName}
                validators={["required"]}
                errorMessages={["Campo requerido"]}
              />
              <TextValidator
                className={classes.inputStyle}
                label="Apellido"
                onChange={handleInputChange}
                name="lastName"
                value={lastName}
                validators={["required"]}
                errorMessages={["Campo requerido"]}
              />
              <TextValidator
                className={classes.inputStyle}
                label="Nombre de usuario"
                onChange={handleInputChange}
                name="username"
                value={username}
                validators={["required"]}
                errorMessages={["Campo requerido"]}
              />
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
              <TextValidator
                className={classes.inputStyle}
                label="Teléfono"
                onChange={handleInputChange}
                name="phone"
                value={phone}
                validators={["required"]}
                errorMessages={["Campo requerido"]}
              />
              <Button
                className={classes.buttonStyles}
                variant="contained"
                type="submit"
              >
                Register
              </Button>
            </ValidatorForm>
          </Container>
          <Typography component="div">
            ¿Posees una cuenta?
            <Box fontWeight="fontWeightBold">
              <Link to="/login" variant="text" color="blue">
                Pincha aquí
              </Link>{" "}
              para ingresar
            </Box>
          </Typography>
        </Paper>
      </Grid>
    </>
  );
};

export default Register;
