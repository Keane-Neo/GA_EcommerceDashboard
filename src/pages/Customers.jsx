import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const Customers = ({ isDrawerOpen, handleSidebarClick }) => {
  // const [isEdit, setIsEdit] = useState(false);
  // const [isDelete, setIsDelete] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: 3,
    name: "",
    email: "",
    mobile: "",
    joinDate: "",
    orderCount: "",
    isSelected: false,
    isEdit: false,
    isDelete: false,
  });
  const [customerData, setCustomerData] = useState([
    {
      id: 1,
      name: "Keane",
      email: "Keane@abc.com",
      mobile: "999999",
      joinDate: "01/01/2022",
      orderCount: "4",
      isSelected: false,
      isEdit: false,
      isDelete: false,
    },
    {
      id: 2,
      name: "Keane",
      email: "Keane@abc.com",
      mobile: "999999",
      joinDate: "01/01/2022",
      orderCount: "4",
      isSelected: false,
      isEdit: false,
      isDelete: false,
    },
  ]);

  const handleEditClick = (row) => {
    updateIsEditTrue(row);
  };

  const handleDeleteClick = (row) => {
    updateIsDeleteTrue(row);
  };

  const handleConfirmClick = (row) => {
    // change back to edit / delete icon
    if (row.isDelete) {
      updateIsDeleteFalse(row);
      const newData = customerData.filter((data) => row.id !== data.id);
      setCustomerData(newData);
    } else if (row.isEdit) {
      // check format of input
      updateIsEditFalse(row);
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
    const updatedCustomerData = customerData.map((data) => {
      if (row.id === data.id) {
        return { ...data, isEdit: false, isSelected: false };
      } else return data;
    });
    setCustomerData(updatedCustomerData);
  };

  const updateIsEditTrue = (row) => {
    const updatedCustomerData = customerData.map((data) => {
      if (row.id === data.id) {
        return { ...data, isEdit: true, isSelected: true };
      } else return data;
    });
    setCustomerData(updatedCustomerData);
  };

  const updateIsDeleteFalse = (row) => {
    const updatedCustomerData = customerData.map((data) => {
      if (row.id === data.id) {
        return { ...data, isDelete: false, isSelected: false };
      } else return data;
    });
    setCustomerData(updatedCustomerData);
  };

  const updateIsDeleteTrue = (row) => {
    const updatedCustomerData = customerData.map((data) => {
      if (row.id === data.id) {
        return { ...data, isDelete: true, isSelected: true };
      } else return data;
    });
    setCustomerData(updatedCustomerData);
  };

  const handleChange = (row, e) => {
    const updatedCustomerData = customerData.map((data) => {
      if (row.id === data.id) {
        return { ...data, [e.target.name]: e.target.value };
      } else return data;
    });
    setCustomerData(updatedCustomerData);
  };

  const handleFormChange = (e) => {
    const updatedFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDialogOpen(false);
    setCustomerData((prev) => {
      return [...prev, formData];
    });
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: " 100%",
          }}
        >
          <Sidebar
            isDrawerOpen={isDrawerOpen}
            handleSidebarClick={handleSidebarClick}
          />
          <Typography variant="h1" fontSize="2rem">
            Customers
          </Typography>
          <Button variant="outlined" onClick={() => setIsDialogOpen(true)}>
            Create New User
          </Button>
        </Box>
        <Table sx={{}}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Member Since</TableCell>
              <TableCell>Orders</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customerData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  {row.isEdit ? (
                    <TextField
                      name="name"
                      type="text"
                      onChange={(e) => handleChange(row, e)}
                      value={row.name}
                      size="small"
                    ></TextField>
                  ) : (
                    row.name
                  )}
                </TableCell>
                <TableCell>
                  {row.isEdit ? (
                    <TextField
                      name="email"
                      type="email"
                      onChange={(e) => handleChange(row, e)}
                      value={row.email}
                      size="small"
                    ></TextField>
                  ) : (
                    row.email
                  )}
                </TableCell>
                <TableCell>
                  {row.isEdit ? (
                    <TextField
                      name="mobile"
                      type="text"
                      onChange={(e) => handleChange(row, e)}
                      value={row.mobile}
                      size="small"
                    ></TextField>
                  ) : (
                    row.mobile
                  )}
                </TableCell>
                <TableCell>{row.joinDate}</TableCell>
                <TableCell>{row.orderCount}</TableCell>
                <TableCell>
                  {row.isSelected ? (
                    <CheckIcon
                      type="submit"
                      onClick={() => handleConfirmClick(row)}
                    />
                  ) : (
                    <EditIcon onClick={() => handleEditClick(row)} />
                  )}
                  {row.isSelected ? (
                    <ClearIcon onClick={() => handleCloseClick(row)} />
                  ) : (
                    <DeleteIcon onClick={() => handleDeleteClick(row)} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Create a New User</DialogTitle>
        <DialogContent sx={{ height: "80%" }}>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "5px" }}
          >
            <TextField
              size="small"
              type="text"
              value={formData.name}
              name="name"
              onChange={(e) => handleFormChange(e)}
              placeholder="Name"
              required
            />
            <TextField
              size="small"
              type="email"
              value={formData.email}
              name="email"
              onChange={(e) => handleFormChange(e)}
              placeholder="Email"
            />
            <TextField
              size="small"
              type="text"
              value={formData.mobile}
              name="mobile"
              onChange={(e) => handleFormChange(e)}
              placeholder="Mobile"
            />
            <TextField
              size="small"
              type="date"
              value={formData.joinDate}
              name="joinDate"
              onChange={(e) => handleFormChange(e)}
              placeholder="Join Date"
            />
            <TextField
              size="small"
              type="text"
              value={formData.orderCount}
              name="orderCount"
              onChange={(e) => handleFormChange(e)}
              placeholder="Orders"
            />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Customers;
