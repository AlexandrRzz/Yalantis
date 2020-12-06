import React, { useState } from "react";

export const StoreContext = React.createContext(null);

export default ({ children }) => {
  const initialState = () => {
    return JSON.parse(localStorage.getItem("employees")) || [];
  };

  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState(initialState());
  const [loading, setLoading] = useState(true);

  const store = {
    employees: [employees, setEmployees],
    selected: [selected, setSelected],
    loading: [loading, setLoading],
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
