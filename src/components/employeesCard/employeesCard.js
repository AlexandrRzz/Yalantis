import { StoreContext } from "./../../utils/store";
import { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import "./employeesCard.css";
export default function EmployeesCard({ header, employeList = [] }) {
  const {
    selected: [selected, setSelected],
  } = useContext(StoreContext);

  useEffect(() => {
    Cookies.set("employees", JSON.stringify(selected));
  }, [selected]);

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

  const renderItems = (arr) => {
    if (arr.length === 0) {
      return <li>---</li>;
    }
    return arr.map(({ id, firstName, lastName }) => {
      return (
        <li key={id}>
          {firstName} {lastName}{" "}
          <input
            type="checkbox"
            checked={selected.indexOf(id) >= 0}
            onChange={() => togleEmploye(id)}
          ></input>
        </li>
      );
    });
  };
  return (
    <div className="employeesCard">
      <h3>{header}</h3>
      <ul className="employeesCard__items">{renderItems(employeList)}</ul>
    </div>
  );
}
