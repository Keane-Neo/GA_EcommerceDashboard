import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Home = ({ isDrawerOpen, handleSidebarClick }) => {
  const [chartData, setChartData] = useState();
  // const [customerData, setCustomerData] = useState();
  // const [orderData, setOrderData] = useState();
  const [chartData2, setChartData2] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const customerRes = await axios.get(
          "http://localhost:8080/admin/customers"
        );
        const orderRes = await axios.get("http://localhost:8080/admin/orders");
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
        setChartData2(
          orderRes.data.map((order) => {
            return {
              Date: order.orderDate,
              Total: order.totalPrice,
            };
          })
        );
      } catch (err) {
        console.log(err);
      }
    };
    getData();
    console.log(chartData);
    console.log(chartData2);
  }, []);
  return (
    <Stack direction="row" sx={{ backgroundColor: "beige" }}>
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name"></XAxis>
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="green" />
        </BarChart>
        <BarChart width={730} height={250} data={chartData2}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis
            label={{
              value: "Total Price / $",
              position: "left",
              angle: -90,
              offset: -10,
            }}
          />
          <Tooltip />
          <Bar dataKey="Total" fill="magenta" />
        </BarChart>
      </Box>
    </Stack>
  );
};

export default Home;
