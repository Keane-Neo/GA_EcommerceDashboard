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

const Sidebar = ({ isDrawerOpen, handleSidebarClick }) => {
  const pages = ["Home", "Customers", "Orders", "Products"];

  return (
    <Box onClick={handleSidebarClick}>
      <Button onClick={handleSidebarClick}>
        <DensityMediumRoundedIcon />
      </Button>
      <Drawer open={isDrawerOpen}>
        <List>
          {pages.map((ele) => (
            <ListItem divider>
              <ListItemButton onClick={handleSidebarClick}>
                <ListItemText primary={ele}></ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
