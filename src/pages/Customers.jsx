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
import React from "react";
import Sidebar from "../components/Sidebar";

const Customers = ({
  isDrawerOpen,
  handleSidebarClick,
  editRow,
  isAction,
  handleEditClick,
  handleDeleteClick,
  handleConfirmClick,
  handleCloseClick,
  customerData,
  isEdit,
}) => {
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
                  {isEdit ? (
                    <TextField value={row.name} size="small"></TextField>
                  ) : (
                    row.name
                  )}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.mobile}</TableCell>
                <TableCell>{row.joinDate}</TableCell>
                <TableCell>{row.orderCount}</TableCell>
                <TableCell>
                  {isAction ? (
                    <CheckIcon
                      onClick={() => {
                        handleConfirmClick(row.id);
                      }}
                    />
                  ) : (
                    <EditIcon onClick={handleEditClick} />
                  )}
                  {isAction ? (
                    <ClearIcon onClick={handleCloseClick} />
                  ) : (
                    <DeleteIcon onClick={handleDeleteClick} />
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
