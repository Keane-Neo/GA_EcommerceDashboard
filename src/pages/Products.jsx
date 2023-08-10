import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  ImageListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import NewProductForm from "../components/NewProductForm";
import Sidebar from "../components/Sidebar";
import headphoneImage from "../images/headphones.jpeg";

const Products = ({ isDrawerOpen, handleSidebarClick }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState({ description: "", price: "" });
  const [productsData, setProductsData] = useState([
    {
      id: 1,
      description: "headphones",
      price: 59.99,
      image: headphoneImage,
      isSelected: false,
      isEdit: false,
      isDelete: false,
    },
    {
      id: 2,
      description: "headphones",
      price: 59.99,
      image: headphoneImage,
      isSelected: false,
      isEdit: false,
      isDelete: false,
    },
    {
      id: 3,
      description: "headphones",
      price: 59.99,
      image: headphoneImage,
      isSelected: false,
      isEdit: false,
      isDelete: false,
    },
  ]);

  const handleEditClick = (row) => {
    updateIsEditTrue(row);
    setEditItem({
      ...editItem,
      description: row.description,
      price: row.price,
    });
  };

  const handleDeleteClick = (row) => {
    updateIsDeleteTrue(row);
  };

  const handleConfirmClick = (row) => {
    // change back to edit / delete icon
    if (row.isDelete) {
      const newData = productsData.filter((data) => row.id !== data.id);
      setProductsData(newData);
    } else if (row.isEdit) {
      // check format of input
      const updatedProductsData = productsData.map((data) => {
        if (row.id === data.id) {
          return {
            ...data,
            description: editItem.description,
            price: editItem.price,
            isEdit: false,
            isSelected: false,
          };
        } else return data;
      });
      setProductsData(updatedProductsData);
      setEditItem((prev) => {
        return { ...prev, description: "", price: "" };
      });
    }
  };

  const handleCloseClick = (row) => {
    // change back to edit / delete icon
    if (row.isDelete) {
      updateIsDeleteFalse(row);
    } else if (row.isEdit) {
      // check format of input
      updateIsEditFalse(row);
    }
  };

  const updateIsEditFalse = (row) => {
    const updatedProductsData = productsData.map((data) => {
      if (row.id === data.id) {
        return { ...data, isEdit: false, isSelected: false };
      } else return data;
    });
    setProductsData(updatedProductsData);
  };

  const updateIsEditTrue = (row) => {
    const updatedProductsData = productsData.map((data) => {
      if (row.id === data.id) {
        return { ...data, isEdit: true, isSelected: true };
      } else return data;
    });
    setProductsData(updatedProductsData);
  };

  const updateIsDeleteFalse = (row) => {
    const updatedProductsData = productsData.map((data) => {
      if (row.id === data.id) {
        return { ...data, isDelete: false, isSelected: false };
      } else return data;
    });
    setProductsData(updatedProductsData);
  };

  const updateIsDeleteTrue = (row) => {
    const updatedProductsData = productsData.map((data) => {
      if (row.id === data.id) {
        return { ...data, isDelete: true, isSelected: true };
      } else return data;
    });
    setProductsData(updatedProductsData);
  };

  const handleChange = (e) => {
    const updatedRow = { ...editItem, [e.target.name]: e.target.value };
    setEditItem(updatedRow);
  };

  const onSubmitNewProduct = (formData) => {
    setIsDialogOpen(false);
    setProductsData((prev) => {
      return [...prev, formData];
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Create a New Product</DialogTitle>
        <DialogContent sx={{ height: "80%" }}>
          <NewProductForm onSubmitNewProduct={onSubmitNewProduct} />
        </DialogContent>
      </Dialog>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: "50px",
        }}
      >
        <Sidebar
          isDrawerOpen={isDrawerOpen}
          handleSidebarClick={handleSidebarClick}
        />
        <Typography variant="h1" fontSize="2rem">
          Products
        </Typography>
        <Button variant="outlined" onClick={() => setIsDialogOpen(true)}>
          Create New Product
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          width: "100%",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        {productsData.map((item) => {
          return (
            <Card
              sx={{
                width: "30%",
                height: "42%",
                backgroundColor: "lightgrey",
                overflow: "auto",
              }}
              key={item.id}
            >
              <Stack direction="column" alignItems="center">
                <ImageListItem
                  sx={{
                    width: "90%",
                    height: "50%",
                    marginBottom: "5px",
                    objectFit: "contain",
                  }}
                >
                  <img src={item.image} alt={item.description} />
                </ImageListItem>
                {item.isEdit ? (
                  <TextField
                    name="description"
                    type="text"
                    onChange={(e) => handleChange(e)}
                    value={editItem.description}
                    size="small"
                  ></TextField>
                ) : (
                  <Typography
                    variant="h3"
                    fontSize="1rem"
                    sx={{ margin: "0 auto" }}
                  >
                    {item.description}
                  </Typography>
                )}

                {item.isEdit ? (
                  <TextField
                    name="price"
                    type="text"
                    onChange={(e) => handleChange(e)}
                    value={editItem.price}
                    size="small"
                  ></TextField>
                ) : (
                  <Typography
                    variant="h3"
                    fontSize="1rem"
                    sx={{ margin: "0 auto" }}
                  >
                    ${item.price}
                  </Typography>
                )}
                <Stack direction="row">
                  {item.isSelected ? (
                    <CheckIcon
                      sx={{ color: "green", fontSize: "2rem" }}
                      onClick={() => handleConfirmClick(item)}
                    />
                  ) : (
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      sx={{ marginRight: "5px" }}
                      onClick={() => handleEditClick(item)}
                    >
                      Edit
                    </Button>
                  )}
                  {item.isSelected ? (
                    <ClearIcon
                      sx={{ color: "red", fontSize: "2rem" }}
                      onClick={() => handleCloseClick(item)}
                    />
                  ) : (
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteClick(item)}
                    >
                      Delete
                    </Button>
                  )}
                </Stack>
              </Stack>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default Products;
