import React from "react";
import Sidebar from "../components/Sidebar";

const Home = ({ isDrawerOpen, handleSidebarClick }) => {
  return (
    <div>
      <Sidebar
        isDrawerOpen={isDrawerOpen}
        handleSidebarClick={handleSidebarClick}
      />
      Home
    </div>
  );
};

export default Home;
