import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
  Box,
  Button,
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
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [customerData, setCustomerData] = useState([
    {
      id: 1,
      name: "Keane",
      email: "Keane@abc.com",
      mobile: "999999",
      joinDate: "01/01/2022",
      orderCount: "4",
      isSelected: false,
    },
    {
      id: 2,
      name: "Keane",
      email: "Keane@abc.com",
      mobile: "999999",
      joinDate: "01/01/2022",
      orderCount: "4",
      isSelected: false,
    },
  ]);
  const resetButtons = () => {
    setIsEdit(false);
    setIsDelete(false);
  };
  const handleEditClick = (row) => {
    updateIsSelectedTrue(row);
    setIsEdit(!isEdit);
  };

  const handleDeleteClick = (row) => {
    updateIsSelectedTrue(row);
    setIsDelete(!isDelete);
  };

  const handleConfirmClick = (row) => {
    // change back to edit / delete icon
    updateIsSelectedFalse(row);

    if (isDelete) {
      const newData = customerData.filter((data) => row.id !== data.id);
      setCustomerData(newData);
      resetButtons();
    } else if (isEdit) {
      // check format of input

      resetButtons();
    }
  };

  const handleCloseClick = (row) => {
    // change back to edit / delete icon
    updateIsSelectedFalse(row);
    resetButtons();
  };

  const updateIsSelectedFalse = (row) => {
    const updatedCustomerData = customerData.map((data) => {
      if (row.id === data.id) {
        return { ...data, isSelected: false };
      } else return data;
    });
    setCustomerData(updatedCustomerData);
  };

  const updateIsSelectedTrue = (row) => {
    const updatedCustomerData = customerData.map((data) => {
      if (row.id === data.id) {
        return { ...data, isSelected: true };
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

  const handleSubmit = () => {
    console.log("submit");
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
          <Button variant="outlined">Create New User</Button>
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
                  {row.isSelected ? (
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
                  {row.isSelected ? (
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
                  {row.isSelected ? (
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
    </Box>
  );
};

export default Customers;
