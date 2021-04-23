import React from "react";
import {
  Grid,
  List,
  ListItem,
  Paper,
  makeStyles,
  Button,
} from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Cart = () => {
  const classes = useStyles();
  let arrayToShow = [];
  const productsToBuy = useSelector((state) => state.products.cart);
  localStorage.setItem("cart", JSON.stringify(productsToBuy));

  const getProductsOnStorage = JSON.parse(localStorage.getItem("cart"));

  let counter = [];
  if (getProductsOnStorage.length) {
    counter = getProductsOnStorage.map((product) => product.price);
    arrayToShow = getProductsOnStorage;
  } else if (productsToBuy.length) {
    counter = productsToBuy.map((product) => product.price);
    arrayToShow = productsToBuy;
  } else {
    counter = [];
  }
  let finalPrice = 0;
  if (counter?.length) {
    finalPrice =
      counter?.reduce((acc, curr) => Number(acc) + Number(curr)) || 0;
  }
  return (
    <Grid>
      <Paper>
        <List>
          {arrayToShow.length > 1 ? (
            arrayToShow.map((product) => {
              const { name, price } = product;
              return (
                <ListItem className={classes.root}>
                  <Grid>
                    <Grid>{name}</Grid>
                    <Grid>{price}</Grid>
                  </Grid>
                </ListItem>
              );
            })
          ) : (
            <Grid>No hay nada para mostrar</Grid>
          )}
        </List>
        <Grid>Precio final: {finalPrice || 0}</Grid>
        <Button onClick={() => alert("Gracias por su compra!")}>Pagar</Button>
      </Paper>
    </Grid>
  );
};

export default Cart;
