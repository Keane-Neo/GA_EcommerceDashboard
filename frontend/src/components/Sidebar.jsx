import DensityMediumRoundedIcon from "@mui/icons-material/DensityMediumRounded";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isDrawerOpen, handleSidebarClick }) => {
  // const pages = ["Home", "Customers", "Orders", "Products"];
  const pages = [
    { name: "Home", link: "/" },
    {
      name: "Customers",
      link: "/customers",
    },
    {
      name: "Orders",
      link: "/orders/all",
    },
    {
      name: "Products",
      link: "/products",
    },
  ];

  return (
    <Box onClick={handleSidebarClick}>
      <Button onClick={handleSidebarClick}>
        <DensityMediumRoundedIcon />
      </Button>
      <Drawer open={isDrawerOpen}>
        <List>
          {pages.map((ele, index) => (
            <ListItem divider key={index}>
              <NavLink to={ele.link}>
                <ListItemButton onClick={handleSidebarClick}>
                  <ListItemText primary={ele.name}></ListItemText>
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
