import { StoreContext } from "./../../utils/store";
import { useContext } from "react";
import EmployeesCard from "./../employeesCard/employeesCard";
import "./employeesCards.css";
function groupEmployesByAlphabet(empl) {
  const resObj = empl.reduce((res, employe) => {
    const firstLetter = employe.firstName[0];
    if (!res[firstLetter]) {
      res[firstLetter] = [employe];
    } else {
      res[firstLetter].push(employe);
    }
    return res;
  }, {});
  return resObj;
}

export default function EmployeesCards({ togleEmploye }) {
  const {
    employees: [employees],
  } = useContext(StoreContext);

  const groupEmployes = groupEmployesByAlphabet(employees);
  const employeesCardsList = [];

  for (let i = 65; i < 91; i++) {
    const letter = String.fromCharCode(i);
    employeesCardsList.push(
      <EmployeesCard
        key={letter}
        header={letter}
        employeList={groupEmployes[letter]}
      />
    );
  }

  return (
    <div className="employeesCards">
      <h2>​Employees</h2>
      <div className="employeesCards__cards">{employeesCardsList}</div>
    </div>
  );
}
