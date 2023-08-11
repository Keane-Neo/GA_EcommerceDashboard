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
      description: "Headphones",
      price: 59.99,
      image: headphoneImage,
      isSelected: false,
      isEdit: false,
      isDelete: false,
    },
    {
      id: 2,
      description: "Cap",
      price: 19.99,
      image:
        "data:image/jpeg;base64,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",
      isSelected: false,
      isEdit: false,
      isDelete: false,
    },
    {
      id: 3,
      description: "Shoes",
      price: 89.99,
      image:
        "data:image/jpeg;base64,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",
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
        <Typography variant="h1" fontSize="3rem" fontWeight="bold">
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
                <Stack sx={{ width: "50%", height: "80%" }}>
                  <img
                    src={item.image}
                    alt={item.description}
                    style={{
                      margin: "0 auto",
                      marginBottom: "10px",
                      marginTop: "10px",
                    }}
                  />

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
                </Stack>
                <Stack direction="row" marginTop="20px">
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
