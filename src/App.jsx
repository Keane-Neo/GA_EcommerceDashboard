import { useState } from "react";
import Customers from "./pages/Customers";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSidebarClick = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <>
      <Customers
        isDrawerOpen={isDrawerOpen}
        handleSidebarClick={handleSidebarClick}
      />
    </>
  );
}

export default App;
