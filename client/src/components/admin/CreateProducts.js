import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {
  Grid,
  Typography,
  Input,
  MenuItem,
  Chip,
  FormControl,
  Select,
  InputLabel,
  makeStyles,
} from "@material-ui/core";
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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

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

const CreateProducts = ({
  open,
  handleClose,
  product,
  setProduct,
  handleProductSubmit,
  allCategories,
}) => {
  const [categories, setCategories] = useState([]);
  const classes = useStyles();
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChange = (event) => {
    setCategories(event.target.value);
    setProduct({ ...product, categories: event.target.value });
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Crear nuevo producto
        </DialogTitle>
        <DialogContent dividers>
          <ValidatorForm onSubmit={handleProductSubmit}>
            <TextValidator
              margin="dense"
              id="name"
              label="Nombre"
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              autoComplete="off"
              variant="outlined"
              fullWidth
              validators={["required"]}
              errorMessages={["Campo requerido"]}
            />
            <TextValidator
              margin="dense"
              id="description"
              label="Descripción"
              type="text"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              autoComplete="off"
              variant="outlined"
              fullWidth
              validators={["required"]}
              errorMessages={["Campo requerido"]}
            />
            <TextValidator
              margin="dense"
              id="stock"
              label="Stock"
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleInputChange}
              autoComplete="off"
              variant="outlined"
              fullWidth
              validators={["required"]}
              errorMessages={["Campo requerido"]}
            />
            <TextValidator
              margin="dense"
              id="price"
              label="Precio"
              type="text"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              autoComplete="off"
              variant="outlined"
              fullWidth
              validators={["required"]}
              errorMessages={["Campo requerido"]}
            />
            <Grid>
              <InputLabel id="demo-mutiple-chip-label">Categorías</InputLabel>
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  multiple
                  value={categories}
                  onChange={handleChange}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {allCategories.map((category) => {
                    const { name } = category;
                    return (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
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

export default CreateProducts;
