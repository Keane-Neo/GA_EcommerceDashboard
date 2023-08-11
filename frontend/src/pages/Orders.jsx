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
import { useParams } from "react-router-dom";

const Orders = ({ isDrawerOpen, handleSidebarClick }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editRow, setEditRow] = useState({
    orderName: "",
    email: "",
    contactNum: "",
  });
  const [orderDataState, setOrderDataState] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { customerID } = useParams();

  useEffect(() => {
    const getData = async () => {
      console.log(customerID);
      let res = {};
      try {
        if (customerID === "all") {
          res = await axios.get("http://localhost:8080/admin/orders");
        } else {
          res = await axios.get(
            `http://localhost:8080/customer/orders/${customerID}`
          );
        }
        setOrderData(res.data);
        console.log(res.data);
        const orderDataState = res.data.map((item) => {
          return {
            orderID: item.orderID,
            isSelected: false,
            isEdit: false,
            isDelete: false,
          };
        });
        setOrderDataState(orderDataState);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const handleEditClick = (id) => {
    updateIsEditTrue(id);
    const selectedorderData = orderData.filter((data) => data.orderID === id);

    setEditRow({
      ...editRow,
      orderName: selectedorderData[0].orderName,
      email: selectedorderData[0].email,
      contactNum: selectedorderData[0].contactNum,
    });
  };

  const handleDeleteClick = (id) => {
    updateIsDeleteTrue(id);
  };

  const handleConfirmClick = async (id) => {
    // change back to edit / delete icon
    const selectedorderDataState = orderDataState.filter(
      (data) => id === data.orderID
    );

    if (selectedorderDataState[0].isDelete) {
      const newData = orderData.filter(
        (data) => selectedorderDataState[0].orderID !== data.orderID
      );
      setOrderData(newData);
      try {
        await axios.delete(`http://localhost:8080/admin/orders/${id}`);
      } catch (err) {
        console.log(err);
      }
    } else if (selectedorderDataState[0].isEdit) {
      // TODO: check format of input??
      const updatedorderData = orderData.map((data) => {
        if (selectedorderDataState[0].orderID === data.orderID) {
          return {
            ...data,
            orderName: editRow.orderName,
            email: editRow.email,
            contactNum: editRow.contactNum,
          };
        } else return data;
      });
      setOrderData(updatedorderData);
      try {
        await axios.put(`http://localhost:8080/admin/orders/${id}`, {
          orderName: editRow.orderName,
          email: editRow.email,
          contactNum: editRow.contactNum,
        });
      } catch (err) {
        console.log(err);
      }
      updateIsEditFalse(id);
      setEditRow((prev) => {
        return { ...prev, orderName: "", email: "", contactNum: "" };
      });
    }
  };

  const handleCloseClick = () => {
    const updatedorderDataState = orderDataState.map((data) => {
      return { ...data, isSelected: false, isEdit: false, isDelete: false };
    });
    setOrderDataState(updatedorderDataState);
  };

  const updateIsEditFalse = (id) => {
    const updatedorderDataState = orderDataState.map((data) => {
      if (id === data.orderID) {
        return { ...data, isEdit: false, isSelected: false };
      } else return data;
    });
    setOrderDataState(updatedorderDataState);
  };

  const updateIsEditTrue = (id) => {
    const updatedorderDataState = orderDataState.map((data) => {
      if (id === data.orderID) {
        return { ...data, isEdit: true, isSelected: true };
      } else return data;
    });
    setOrderDataState(updatedorderDataState);
  };

  const updateIsDeleteTrue = (id) => {
    const updatedorderDataState = orderDataState.map((data) => {
      if (id === data.orderID) {
        return { ...data, isDelete: true, isSelected: true };
      } else return data;
    });
    setOrderDataState(updatedorderDataState);
  };

  const onSubmitNewOrder = (formData) => {
    setIsDialogOpen(false);
    const newUUID = crypto.randomUUID();
    setOrderDataState((prev) => {
      return [
        ...prev,
        {
          orderID: newUUID,
          isSelected: false,
          isEdit: false,
          isDelete: false,
        },
      ];
    });
    setOrderData((prev) => {
      return [
        ...prev,
        {
          orderID: newUUID,
          orderName: formData.name,
          email: formData.email,
          contactNum: formData.mobile,
          joinDate: formData.date.toLocaleDateString(),
          orderCount: formData.orders,
        },
      ];
    });
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
        <DialogTitle>Create a New Order</DialogTitle>
        <DialogContent sx={{ height: "80%" }}>
          <NewUserForm onSubmitNewOrder={onSubmitNewOrder} />
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
            Orders
          </Typography>
          <Button variant="outlined" onClick={() => setIsDialogOpen(true)}>
            Create New Order
          </Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Number of Items</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderData
                .slice(
                  currentPage * rowsPerPage,
                  currentPage * rowsPerPage + rowsPerPage
                )
                .map((row) => (
                  <TableRow key={row.orderID}>
                    <TableCell>{row.orderID}</TableCell>
                    <TableCell>{row.customer.customerName}</TableCell>
                    <TableCell>{row.numOfItems}</TableCell>
                    <TableCell>${row.totalPrice}</TableCell>
                    <TableCell>{row.orderDate}</TableCell>

                    <TableCell>
                      {orderDataState.filter((data) => {
                        return data.orderID === row.orderID;
                      })[0].isSelected ? (
                        <CheckIcon
                          sx={{ color: "green", fontSize: "1.4rem" }}
                          onClick={() => handleConfirmClick(row.orderID)}
                        />
                      ) : (
                        <EditIcon
                          onClick={() => handleEditClick(row.orderID)}
                        />
                      )}
                      {orderDataState.filter(
                        (data) => data.orderID === row.orderID
                      )[0].isSelected ? (
                        <ClearIcon
                          sx={{ color: "red", fontSize: "1.4rem" }}
                          onClick={() => handleCloseClick()}
                        />
                      ) : (
                        <DeleteIcon
                          onClick={() => handleDeleteClick(row.orderID)}
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
            count={orderData.length}
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

export default Orders;
