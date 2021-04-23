import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const createCategory = ({
  open,
  handleClose,
  category,
  setCategory,
  handleCategorySubmit,
}) => {
  const handleInputChange = (e) => {
    e.preventDefault();
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Crear nueva categoría
        </DialogTitle>
        <DialogContent dividers>
          <ValidatorForm onSubmit={handleCategorySubmit}>
            <TextValidator
              margin="dense"
              id="name"
              label="Nombre"
              type="text"
              name="name"
              onChange={handleInputChange}
              autoComplete="off"
              variant="outlined"
              fullWidth
            />
            <Grid>
              <Button type="submit" variant="contained">
                Guardar
              </Button>
            </Grid>
          </ValidatorForm>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default createCategory;
