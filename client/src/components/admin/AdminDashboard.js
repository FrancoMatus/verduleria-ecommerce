import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AdminProducts from "./AdminProducts";
import AdminCategories from "./AdminCategories";
import AdminUsers from "./AdminUsers";
import AdminOrders from "./AdminOrders";
import NavBar from "../elements/Navbar";
import { useSelector } from "react-redux";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function AdminDashboard() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const userLoggedIn = useSelector((state) => state.users.user);
  const menuOptions = [
    { title: "Productos", component: <AdminProducts /> },
    { title: "Categorías", component: <AdminCategories /> },
    { title: "Usuarios", component: <AdminUsers /> },
    { title: "Ordenes", component: <AdminOrders /> },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <NavBar userData={userLoggedIn} />
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {menuOptions.length &&
            menuOptions?.map((option, i) => {
              const { title } = option;
              return <Tab label={title} {...a11yProps(i)} />;
            })}
        </Tabs>
      </AppBar>
      {menuOptions.length &&
        menuOptions?.map((option, i) => {
          const { component } = option;
          return (
            <TabPanel value={value} index={i}>
              {component}
            </TabPanel>
          );
        })}
    </div>
  );
}
