import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from "recharts";

const Home = ({ isDrawerOpen, handleSidebarClick }) => {
  const [chartData, setChartData] = useState();
  const [customerData, setCustomerData] = useState();
  const [orderData, setOrderData] = useState();
  useEffect(() => {
    const getData = async () => {
      try {
        const customerRes = await axios.get(
          "http://localhost:8080/admin/customers"
        );
        setCustomerData(customerRes.data);
        const orderRes = await axios.get("http://localhost:8080/admin/orders");
        setOrderData(orderRes.data);
        setChartData([
          {
            name: "Customers",
            count: customerRes.data.length,
          },
          {
            name: "Orders",
            count: orderRes.data.length,
          },
        ]);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
    console.log(chartData);
  }, []);
  return (
    <Stack direction="row">
      <Sidebar
        isDrawerOpen={isDrawerOpen}
        handleSidebarClick={handleSidebarClick}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
        }}
      >
        <Typography variant="h1" fontSize="3rem" fontWeight="bold">
          Home
        </Typography>
        <BarChart width={730} height={250} data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="green" />
        </BarChart>
      </Box>
    </Stack>
  );
};

export default Home;
