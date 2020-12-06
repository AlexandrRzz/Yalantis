import { useEffect, useContext } from "react";
import { StoreContext } from "./../../utils/store";
import EmployeesSeervice from "./../../services/employees-service";
import EmployeesCards from "./../employeesCards/employeesCards";
import SelectedEmployeesCards from "../selectedEmployeesCards/selectedEmployeesCards";
import "./employees.css";

export default function Employees() {
  const {
    employees: [, setEmployees],
    loading: [loading, setLoading],
  } = useContext(StoreContext);

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

  return (
    <div className="employees">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="employees__wrapper">
          <EmployeesCards />
          <SelectedEmployeesCards />
        </div>
      )}
    </div>
  );
}
