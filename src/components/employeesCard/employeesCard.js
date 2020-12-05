import "./employeesCard.css";
export default function EmployeesCard({
  header,
  employeList = [],
  selected,
  togleEmploye,
}) {
  function renderItems(arr) {
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
  }
  return (
    <div className="employeesCard">
      <h3>{header}</h3>
      <ul>{renderItems(employeList)}</ul>
    </div>
  );
}
