import { useState, useEffect } from "react";
import EmployeesSeervice from "./../../services/employees-service";
import EmployeesCards from "./../employeesCards/employeesCards";
import SelectedEmployeesCards from "../selectedEmployeesCards/selectedEmployeesCards";
import "./employees.css";

export default function Employees() {
  const initialState = () => {
    return JSON.parse(localStorage.getItem("employees")) || [];
  };

  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState(initialState());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const emplServ = new EmployeesSeervice();
    emplServ.getEmployees().then((employeesData) => {
      const sortedEmployees = [...employeesData].sort((empl1, empl2) =>
        empl1.firstName > empl2.firstName ? 1 : -1
      );
      setEmployees(sortedEmployees);
      setLoading(false);
    });
  }, []);

  useEffect(() => localStorage.setItem("employees", JSON.stringify(selected)), [
    selected,
  ]);

  const togleEmploye = (id) => {
    setSelected((prevSelected) => {
      const idx = prevSelected.indexOf(id);
      const newSelectedEmployees =
        idx >= 0
          ? [...prevSelected.slice(0, idx), ...prevSelected.slice(idx + 1)]
          : [...prevSelected, id];
      return newSelectedEmployees;
    });
  };
  return (
    <div className="employees">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="employees__wrapper">
          <EmployeesCards
            eployees={employees}
            selected={selected}
            togleEmploye={togleEmploye}
          />
          {selected.length > 0 ? (
            <SelectedEmployeesCards eployees={employees} selected={selected} />
          ) : (
            <p>No selected employees</p>
          )}
        </div>
      )}
    </div>
  );
}
