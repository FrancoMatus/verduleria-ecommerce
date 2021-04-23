import React, { useState, useEffect } from "react";
import { List, Grid, ListItem, makeStyles, Button } from "@material-ui/core";
import ProductCard from "./ProductCard";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateProducts from "./CreateProducts";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, getAllProducts } from "../../redux/actions/product";
import { getAllCategories } from "../../redux/actions/category";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  rootStyle: {
    flexGrow: 1,
  },
}));

export default function AlignItemsList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [product, setProduct] = useState(new FormData());
  const { allCategories } = useSelector((state) => state.categories);
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, [dispatch]);

  console.log(product);

  const handleProductSubmit = () => {
    dispatch(createProduct(product));
    setOpenCreateDialog(false);
  };

  return (
    <div className={classes.rootStyle}>
      {openCreateDialog && (
        <CreateProducts
          open={openCreateDialog}
          handleClose={() => setOpenCreateDialog(false)}
          product={product}
          setProduct={setProduct}
          handleProductSubmit={handleProductSubmit}
          allCategories={allCategories}
        />
      )}
      <Grid item xs>
        <Button variant="text" startIcon={<DeleteIcon />}>
          Eliminar
        </Button>
        <Button
          variant="text"
          startIcon={<AddCircleIcon />}
          onClick={() => setOpenCreateDialog(true)}
        >
          Agregar
        </Button>
      </Grid>
      <List className={classes.root}>
        <Grid container spacing={3}>
          {allProducts?.length &&
            allProducts?.map((product) => {
              const { id, name, description, stock, price } = product;
              return (
                <Grid item xs={12}>
                  <ListItem key={id} id={id}>
                    <ProductCard
                      name={name}
                      description={description}
                      stock={stock}
                      price={price}
                    />
                  </ListItem>
                </Grid>
              );
            })}
        </Grid>
      </List>
    </div>
  );
}
