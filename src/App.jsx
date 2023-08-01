import { Box } from "@mui/material";
import { useState } from "react";
import Customers from "./pages/Customers";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSidebarClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Customers
        isDrawerOpen={isDrawerOpen}
        handleSidebarClick={handleSidebarClick}
      />
    </Box>
  );
}

export default App;
