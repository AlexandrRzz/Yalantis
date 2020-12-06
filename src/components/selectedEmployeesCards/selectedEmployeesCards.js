import { StoreContext } from "./../../utils/store";
import { useContext } from "react";
import SelectedEmployeesCard from "../selectedEmployeesCard/selectedEmployeesCard";
import "./selectedEmployeesCards.css";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatDate(date) {
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month}, ${year} year`;
}

function groupSelectedEmployesByMonth(selEmpl, empl) {
  const resArr = [];
  selEmpl.forEach((employe) => {
    const idxEmployee = empl.findIndex((empl) => empl.id === employe);
    if (idxEmployee >= 0) {
      const employeItem = empl[idxEmployee];
      const employeItemDOB = new Date(employeItem.dob);
      const month = employeItemDOB.getMonth();
      const found = resArr.find((el) => el.month === month);
      const employeItemWithFormatedDOB = {
        ...employeItem,
        dob: formatDate(employeItemDOB),
      };
      if (found) {
        found.employees.push(employeItemWithFormatedDOB);
      } else {
        resArr.push({
          month: month,
          employees: [employeItemWithFormatedDOB],
        });
      }
    }
  });
  return resArr;
}

function sortByMonthAndFirstName(arr) {
  return [...arr.sort((a, b) => a.month - b.month)].map((el) => {
    return {
      ...el,
      employees: el.employees.sort((c, d) => {
        return c.firstName > d.firstName ? 1 : -1;
      }),
    };
  });
}

export default function SelectedEmployeesCards() {
  const {
    employees: [employees],
    selected: [selected],
  } = useContext(StoreContext);

  let employeesCardsList = <h3>No selected employees</h3>;

  if (selected.length > 0) {
    const groupEmployes = sortByMonthAndFirstName(
      groupSelectedEmployesByMonth(selected, employees)
    );

    employeesCardsList = groupEmployes.map((group) => {
      return (
        <SelectedEmployeesCard
          key={group.month}
          header={monthNames[group.month]}
          employeList={group.employees}
        />
      );
    });
  }

  return (
    <div className="selectedEmployeesCards">
      <h2>​Employees birthday</h2>
      {employeesCardsList}
    </div>
  );
}
