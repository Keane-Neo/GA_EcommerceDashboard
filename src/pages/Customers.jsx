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
import React, { useEffect, useState } from "react";

import NewUserForm from "../components/NewUserForm";
import Sidebar from "../components/Sidebar";

const Customers = ({ isDrawerOpen, handleSidebarClick }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editRow, setEditRow] = useState({ name: "", email: "", mobile: "" });
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

  useEffect(() => {
    console.log("hello");
  }, [customerData]);

  const handleEditClick = (row) => {
    updateIsEditTrue(row);
    setEditRow({
      ...editRow,
      name: row.name,
      email: row.email,
      mobile: row.mobile,
    });
  };

  const handleDeleteClick = (row) => {
    updateIsDeleteTrue(row);
  };

  const handleConfirmClick = (row) => {
    // change back to edit / delete icon
    if (row.isDelete) {
      const newData = customerData.filter((data) => row.id !== data.id);
      setCustomerData(newData);
    } else if (row.isEdit) {
      // TODO: check format of input??
      const updatedCustomerData = customerData.map((data) => {
        if (row.id === data.id) {
          return {
            ...data,
            name: editRow.name,
            email: editRow.email,
            mobile: editRow.mobile,
            isEdit: false,
            isSelected: false,
          };
        } else return data;
      });
      setCustomerData(updatedCustomerData);
      setEditRow((prev) => {
        return { ...prev, name: "", email: "", mobile: "" };
      });
    }
  };

  const handleCloseClick = (row) => {
    // change back to edit / delete icon
    if (row.isDelete) {
      updateIsDeleteFalse(row);
    } else if (row.isEdit) {
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

  const handleChange = (e) => {
    const updatedRow = { ...editRow, [e.target.name]: e.target.value };
    setEditRow(updatedRow);
  };

  const onSubmitNewUser = (formData) => {
    setIsDialogOpen(false);
    setCustomerData((prev) => {
      return [...prev, formData];
    });
  };
  return (
    <Box>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Create a New User</DialogTitle>
        <DialogContent sx={{ height: "80%" }}>
          <NewUserForm onSubmitNewUser={onSubmitNewUser} />
        </DialogContent>
      </Dialog>
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
            width: "100%",
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
        <Table>
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
                      onChange={(e) => handleChange(e)}
                      value={editRow.name}
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
                      onChange={(e) => handleChange(e)}
                      value={editRow.email}
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
                      onChange={(e) => handleChange(e)}
                      value={editRow.mobile}
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
                      sx={{ color: "green", fontSize: "1.4rem" }}
                      onClick={() => handleConfirmClick(row)}
                    />
                  ) : (
                    <EditIcon onClick={() => handleEditClick(row)} />
                  )}
                  {row.isSelected ? (
                    <ClearIcon
                      sx={{ color: "red", fontSize: "1.4rem" }}
                      onClick={() => handleCloseClick(row)}
                    />
                  ) : (
                    <DeleteIcon onClick={() => handleDeleteClick(row)} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default Customers;
