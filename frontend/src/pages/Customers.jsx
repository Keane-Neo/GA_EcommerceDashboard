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
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import NewUserForm from "../components/NewUserForm";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Customers = ({ isDrawerOpen, handleSidebarClick }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editRow, setEditRow] = useState({
    customerName: "",
    email: "",
    contactNum: "",
  });
  const [customerDataState, setCustomerDataState] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/admin/customers");
        setCustomerData(res.data);
        console.log(res.data);
        const customerDataState = res.data.map((item) => {
          return {
            customerID: item.customerID,
            isSelected: false,
            isEdit: false,
            isDelete: false,
          };
        });
        setCustomerDataState(customerDataState);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const handleEditClick = (id) => {
    updateIsEditTrue(id);
    const selectedCustomerData = customerData.filter(
      (data) => data.customerID === id
    );

    setEditRow({
      ...editRow,
      customerName: selectedCustomerData[0].customerName,
      email: selectedCustomerData[0].email,
      contactNum: selectedCustomerData[0].contactNum,
    });
  };

  const handleDeleteClick = (id) => {
    updateIsDeleteTrue(id);
  };

  const handleConfirmClick = async (id) => {
    // change back to edit / delete icon
    const selectedCustomerDataState = customerDataState.filter(
      (data) => id === data.customerID
    );

    if (selectedCustomerDataState[0].isDelete) {
      const newData = customerData.filter(
        (data) => selectedCustomerDataState[0].customerID !== data.customerID
      );
      setCustomerData(newData);
      try {
        await axios.delete(`http://localhost:8080/admin/customers/${id}`);
      } catch (err) {
        console.log(err);
      }
    } else if (selectedCustomerDataState[0].isEdit) {
      // TODO: check format of input??
      const updatedCustomerData = customerData.map((data) => {
        if (selectedCustomerDataState[0].customerID === data.customerID) {
          return {
            ...data,
            customerName: editRow.customerName,
            email: editRow.email,
            contactNum: editRow.contactNum,
          };
        } else return data;
      });
      setCustomerData(updatedCustomerData);
      try {
        await axios.put(`http://localhost:8080/admin/customers/${id}`, {
          customerName: editRow.customerName,
          email: editRow.email,
          contactNum: editRow.contactNum,
        });
      } catch (err) {
        console.log(err);
      }
      updateIsEditFalse(id);
      setEditRow((prev) => {
        return { ...prev, customerName: "", email: "", contactNum: "" };
      });
    }
  };

  const handleCloseClick = () => {
    const updatedCustomerDataState = customerDataState.map((data) => {
      return { ...data, isSelected: false, isEdit: false, isDelete: false };
    });
    setCustomerDataState(updatedCustomerDataState);
  };

  const updateIsEditFalse = (id) => {
    const updatedCustomerDataState = customerDataState.map((data) => {
      if (id === data.customerID) {
        return { ...data, isEdit: false, isSelected: false };
      } else return data;
    });
    setCustomerDataState(updatedCustomerDataState);
  };

  const updateIsEditTrue = (id) => {
    const updatedCustomerDataState = customerDataState.map((data) => {
      if (id === data.customerID) {
        return { ...data, isEdit: true, isSelected: true };
      } else return data;
    });
    setCustomerDataState(updatedCustomerDataState);
  };

  const updateIsDeleteTrue = (id) => {
    const updatedCustomerDataState = customerDataState.map((data) => {
      if (id === data.customerID) {
        return { ...data, isDelete: true, isSelected: true };
      } else return data;
    });
    setCustomerDataState(updatedCustomerDataState);
  };

  const handleChange = (e) => {
    const updatedRow = { ...editRow, [e.target.name]: e.target.value };
    setEditRow(updatedRow);
  };

  const onSubmitNewUser = async (formData) => {
    setIsDialogOpen(false);
    const newUUID = crypto.randomUUID();
    setCustomerDataState((prev) => {
      return [
        ...prev,
        {
          customerID: newUUID,
          isSelected: false,
          isEdit: false,
          isDelete: false,
        },
      ];
    });
    setCustomerData((prev) => {
      return [
        ...prev,
        {
          customerID: newUUID,
          customerName: formData.name,
          email: formData.email,
          contactNum: formData.mobile,
          joinDate: formData.date.toLocaleDateString(),
          orderCount: formData.orders,
        },
      ];
    });
    try {
      await axios.post("http://localhost:8080/admin/customers", {
        customerID: newUUID,
        customerName: formData.name,
        email: formData.email,
        contactNum: formData.mobile,
        joinDate: formData.date.toLocaleDateString(),
        orderCount: formData.orders,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = (e, p) => {
    setCurrentPage(p);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(0);
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
          <Typography variant="h1" fontSize="3rem" fontWeight="bold">
            Customers
          </Typography>
          <Button variant="outlined" onClick={() => setIsDialogOpen(true)}>
            Create New User
          </Button>
        </Box>
        <TableContainer sx={{ marginTop: "30px", backgroundColor: "beige" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                  Customer ID
                </TableCell>
                <TableCell sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                  Email
                </TableCell>
                <TableCell sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                  Mobile
                </TableCell>
                <TableCell sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                  Member Since
                </TableCell>
                <TableCell sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                  Orders
                </TableCell>
                <TableCell sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customerData
                .slice(
                  currentPage * rowsPerPage,
                  currentPage * rowsPerPage + rowsPerPage
                )
                .map((row) => (
                  <TableRow key={row.customerID}>
                    <TableCell>{row.customerID}</TableCell>
                    <TableCell>
                      {customerDataState.filter(
                        (data) => data.customerID === row.customerID
                      )[0].isEdit ? (
                        <TextField
                          name="customerName"
                          type="text"
                          onChange={(e) => handleChange(e)}
                          value={editRow.customerName}
                          size="small"
                        ></TextField>
                      ) : (
                        row.customerName
                      )}
                    </TableCell>
                    <TableCell>
                      {customerDataState.filter(
                        (data) => data.customerID === row.customerID
                      )[0].isEdit ? (
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
                      {customerDataState.filter(
                        (data) => data.customerID === row.customerID
                      )[0].isEdit ? (
                        <TextField
                          name="contactNum"
                          type="text"
                          onChange={(e) => handleChange(e)}
                          value={editRow.contactNum}
                          size="small"
                        ></TextField>
                      ) : (
                        row.contactNum
                      )}
                    </TableCell>
                    <TableCell>{row.joinDate}</TableCell>
                    <TableCell>
                      <NavLink to={`/orders/${row.customerID}`}>
                        {row.orderCount}
                      </NavLink>
                    </TableCell>
                    <TableCell>
                      {customerDataState.filter((data) => {
                        return data.customerID === row.customerID;
                      })[0].isSelected ? (
                        <CheckIcon
                          sx={{ color: "green", fontSize: "1.4rem" }}
                          onClick={() => handleConfirmClick(row.customerID)}
                        />
                      ) : (
                        <EditIcon
                          onClick={() => handleEditClick(row.customerID)}
                        />
                      )}
                      {customerDataState.filter(
                        (data) => data.customerID === row.customerID
                      )[0].isSelected ? (
                        <ClearIcon
                          sx={{ color: "red", fontSize: "1.4rem" }}
                          onClick={() => handleCloseClick()}
                        />
                      ) : (
                        <DeleteIcon
                          onClick={() => handleDeleteClick(row.customerID)}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={customerData.length}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Customers;
