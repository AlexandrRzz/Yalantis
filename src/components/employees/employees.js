import { useState, useEffect } from "react";
import EmployeesSeervice from "./../../services/employees-service";
import EmployeesCards from "./../employeesCards/employeesCards";
import SelectedEmployeesCards from "../selectedEmployeesCards/selectedEmployeesCards";
import "./employees.css";

export default function Employees() {
  const initialState = () => {
    return {
      selectedEmployees: JSON.parse(localStorage.getItem("employees")) || [],
      employees: [],
    };
  };

  const [employees, setEmployees] = useState(initialState());
  const [selected, setSelected] = useState(initialState());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const emplServ = new EmployeesSeervice();
    emplServ.getEmployees().then((employeesData) => {
      const sortedEmployees = [...employeesData].sort((empl1, empl2) =>
        empl1.firstName > empl2.firstName ? 1 : -1
      );
      setEmployees((prevEmployees) => {
        return { ...prevEmployees, data: sortedEmployees };
      });
      setLoading(false);
    });
  }, []);

  useEffect(
    () =>
      localStorage.setItem(
        "employees",
        JSON.stringify(employees.selectedEmployees)
      ),
    [employees.selectedEmployees]
  );

  const togleEmploye = (id) => {
    setEmployees((prevEmployees) => {
      const idx = prevEmployees.selectedEmployees.indexOf(id);
      const newSelectedEmployees =
        idx >= 0
          ? [
              ...prevEmployees.selectedEmployees.slice(0, idx),
              ...prevEmployees.selectedEmployees.slice(idx + 1),
            ]
          : [...prevEmployees.selectedEmployees, id];
      return {
        ...prevEmployees,
        selectedEmployees: newSelectedEmployees,
      };
    });
  };
  return (
    <div className="employees">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="employees__wrapper">
          <EmployeesCards
            eployees={employees.data}
            selected={employees.selectedEmployees}
            togleEmploye={togleEmploye}
          />
          {employees.selectedEmployees.length > 0 ? (
            <SelectedEmployeesCards
              eployees={employees.data}
              selected={employees.selectedEmployees}
            />
          ) : (
            <p>No selected employees</p>
          )}
        </div>
      )}
    </div>
  );
}
