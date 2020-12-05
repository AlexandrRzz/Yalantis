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

export default function EmployeesCards({ eployees, selected, togleEmploye }) {
  const groupEmployes = groupEmployesByAlphabet(eployees);
  const employeesCardsList = [];

  for (let i = 65; i < 91; i++) {
    const letter = String.fromCharCode(i);
    employeesCardsList.push(
      <EmployeesCard
        key={letter}
        header={letter}
        employeList={groupEmployes[letter]}
        selected={selected}
        togleEmploye={togleEmploye}
      />
    );
  }

  return <div className="employeesCards">{employeesCardsList}</div>;
}
