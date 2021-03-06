export default function SelectedEmployeesCard({ header, employeList = [] }) {
  function renderItems(arr) {
    if (arr.length === 0) {
      return <li>---</li>;
    }
    return arr.map(({ id, firstName, lastName, dob }) => {
      return (
        <li key={id}>
          {lastName} {firstName} - {dob}
        </li>
      );
    });
  }
  return (
    <div>
      <h3>{header}</h3>
      <ul>{renderItems(employeList)}</ul>
    </div>
  );
}
