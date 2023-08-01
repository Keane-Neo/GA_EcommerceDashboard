import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import Sidebar from "../components/Sidebar";

const Customers = ({ isDrawerOpen, handleSidebarClick }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Sidebar
        isDrawerOpen={isDrawerOpen}
        handleSidebarClick={handleSidebarClick}
      />
      <Typography variant="h1" fontSize="2rem" sx={{ marginLeft: "20%" }}>
        Customers
      </Typography>
      <Table sx={{}}>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Member Since</TableCell>
            <TableCell>Orders</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.mobile}</TableCell>
              <TableCell>{row.joinDate}</TableCell>
              <TableCell>{row.orderCount}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Customers;
