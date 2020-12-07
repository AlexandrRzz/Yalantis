import React, { useState } from "react";
import Cookies from "js-cookie";

export const StoreContext = React.createContext(null);

const Store = ({ children }) => {
  const initialState = () => {
    let initialSelected = [];
    const selectedFromCookies = Cookies.get("employees");
    if (selectedFromCookies) {
      initialSelected = JSON.parse(selectedFromCookies);
    }
    return initialSelected;
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

export default Store;
