import { useState } from "react";
import Customers from "./pages/Customers";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editRow, setEditRow] = useState({});
  const [isAction, setIsAction] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [customerData, setCustomerData] = useState([
    {
      id: "1",
      name: "Keane",
      email: "Keane@abc.com",
      mobile: "999999",
      joinDate: "01/01/2022",
      orderCount: "4",
    },
  ]);

  const resetButtons = () => {
    setIsAction(false);
    setIsEdit(false);
    setIsDelete(false);
  };
  const handleEditClick = () => {
    setIsAction(!isAction);
    setIsEdit(!isEdit);
  };

  const handleDeleteClick = () => {
    setIsAction(!isAction);
    setIsDelete(!isDelete);
  };

  const handleConfirmClick = (id) => {
    setIsAction(!isAction);
    if (isDelete) {
      const newData = customerData.filter((row) => row.id !== id);
      setCustomerData(newData);
      resetButtons();
    } else if (isEdit) {
      // check for inputs
      resetButtons();
    }
  };

  const handleCloseClick = () => {
    resetButtons();
  };

  const handleSidebarClick = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <>
      <Customers
        isDrawerOpen={isDrawerOpen}
        handleSidebarClick={handleSidebarClick}
        customerData={customerData}
        editRow={editRow}
        isAction={isAction}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        handleConfirmClick={handleConfirmClick}
        handleCloseClick={handleCloseClick}
        isEdit={isEdit}
      />
    </>
  );
}

export default App;
