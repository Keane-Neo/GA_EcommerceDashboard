import React from "react";
import Sidebar from "../components/Sidebar";

const Orders = ({ isDrawerOpen, handleSidebarClick }) => {
  return (
    <div>
      <Sidebar
        isDrawerOpen={isDrawerOpen}
        handleSidebarClick={handleSidebarClick}
      />
      Orders
    </div>
  );
};

export default Orders;
