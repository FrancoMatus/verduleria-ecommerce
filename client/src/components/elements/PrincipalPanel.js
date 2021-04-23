import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./Navbar";
import { getAllCategories } from "../../redux/actions/category";
import { getAllProducts, createCart } from "../../redux/actions/product";
import ProductCard from "../admin/ProductCard";

const PrincipalPanel = () => {
  const userState = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  const { allProducts, cart } = useSelector((state) => state.products);
  const { allCategories } = useSelector((state) => state.categories);
  const [copyStateProducts, setCopyStateProducts] = useState([]);
  const [allObjectsToBuy, setAllObjectsToBuy] = useState([]);
  const setItemOnLS = (obj) => {
    setAllObjectsToBuy([...allObjectsToBuy].concat(obj));
  };
  useEffect(() => {
    if (allObjectsToBuy) {
      dispatch(createCart(allObjectsToBuy));
    }
  }, [dispatch, allObjectsToBuy]);

  console.log(cart);

  const filterValues = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value === "Todas") {
      console.log(allProducts);
      setCopyStateProducts(allProducts);
    }
    const newStateProds = [];
    for (let i = 0; i < allProducts.length; i++) {
      const { categories } = allProducts[i];
      if (categories.includes(value)) {
        newStateProds.push(allProducts[i]);
      }
    }
    setCopyStateProducts(newStateProds);
  };

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (allProducts) {
      setCopyStateProducts(allProducts);
    }
  }, [allProducts]);
  return (
    <>
      <NavBar userData={userState} />
      <Grid container>
        {userState ? (
          <Paper>
            <Grid>
              <Typography variant="body1" component="div">
                <Box fontWeight="fontWeightBold">
                  Welcome, {userState?.username}!
                </Box>
              </Typography>
            </Grid>
            <Grid item>
              <select
                onChange={(e) => filterValues(e)}
                className="custom-select col-4"
              >
                <option selected="selected" disabled="disabled">
                  Categorías
                </option>
                {[...allCategories, "Todas"].map((c) => {
                  return <option value={c.name}>{c.name}</option>;
                })}
              </select>
            </Grid>
            <Grid container>
              {copyStateProducts.map((product) => {
                const { id, name, description, stock, price } = product;
                return (
                  <Grid item xs={12} sm={6} md={4}>
                    <ProductCard
                      id={id}
                      name={name}
                      description={description}
                      stock={stock}
                      price={price}
                      setItemOnLS={setItemOnLS}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
        ) : (
          <Typography variant="body1" component="div">
            <Box fontWeight="fontWeightBold">
              Ingrese para ver más contenido
            </Box>
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default PrincipalPanel;
