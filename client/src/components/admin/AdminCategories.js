import React, { useEffect, useState } from "react";
import { makeStyles, List, ListItem, Button, Grid } from "@material-ui/core";
import CategoryCard from "./CategoryCard";
import { Delete, AddCircle } from "@material-ui/icons";
import CreateCategory from "./CreateCategories";
import {
  createCategories,
  getAllCategories,
} from "../../redux/actions/category";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const initialState = {
  name: "",
};

export default function AlignItemsList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [category, setCategory] = useState(initialState);
  const { allCategories } = useSelector((state) => state.categories);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  console.log(category);
  const handleCategorySubmit = () => {
    dispatch(createCategories(category));
    setOpenCreateDialog(false);
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <List className={classes.root}>
      {openCreateDialog && (
        <CreateCategory
          open={openCreateDialog}
          handleClose={() => setOpenCreateDialog(false)}
          category={category}
          setCategory={setCategory}
          allCategories={allCategories || []}
          handleCategorySubmit={handleCategorySubmit}
        />
      )}
      <Grid item xs>
        <Button variant="text" startIcon={<Delete />}>
          Eliminar
        </Button>
        <Button
          variant="text"
          startIcon={<AddCircle />}
          onClick={() => setOpenCreateDialog(true)}
        >
          Agregar
        </Button>
      </Grid>
      {allCategories?.map((category) => {
        const { name } = category;
        return (
          <ListItem alignItems="flex-end">
            <CategoryCard name={name} />
          </ListItem>
        );
      })}
    </List>
  );
}
