import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import EmployeesCard from "./employeesCard";

let container = null;
let realUseContext;
let useContextMock;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  realUseContext = React.useContext;
  useContextMock = React.useContext = jest.fn();
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  React.useContext = realUseContext;
});

// it("renders with or without employeList", () => {
//   act(() => {
//     const useContextMockValue = {
//       selected: [[], () => {}],
//     };
//     useContextMock.mockReturnValue(useContextMockValue);
//     render(<EmployeesCard employeList={[]} />, container);
//   });
//   expect(container.textContent).toBe("---");
// });

describe("Test EmployeesCard component", () => {
  test("renders without employeList", () => {
    act(() => {
      const useContextMockValue = {
        selected: [[], () => {}],
      };
      useContextMock.mockReturnValue(useContextMockValue);
      render(<EmployeesCard employeList={[]} />, container);
    });
    expect(container.textContent).toBe("---");
  });

  test("renders with employeList", () => {
    act(() => {
      const useContextMockValue = {
        selected: [[], () => {}],
      };
      useContextMock.mockReturnValue(useContextMockValue);
      const mockEmploye = {
        id: "5e00928dba3201e530e3f9d1",
        firstName: "Addie",
        lastName: "Harrington",
        dob: "2019-06-06T20:32:36.719Z",
      };
      render(<EmployeesCard employeList={[mockEmploye]} />, container);
    });
    expect(container.textContent).toBe("Addie Harrington ");
  });
  test("renders header with header props", () => {
    act(() => {
      const useContextMockValue = {
        selected: [[], () => {}],
      };
      useContextMock.mockReturnValue(useContextMockValue);
      const rmockHeade = "A";
      const mockEmploye = {
        id: "5e00928dba3201e530e3f9d1",
        firstName: "Addie",
        lastName: "Harrington",
        dob: "2019-06-06T20:32:36.719Z",
      };
      render(
        <EmployeesCard header={rmockHeade} employeList={[mockEmploye]} />,
        container
      );
    });
    expect(container.querySelector("h3").textContent).toBe("A");
  });
  test("renders checkBox (not checked)", () => {
    act(() => {
      const useContextMockValue = {
        selected: [[], () => {}],
      };
      useContextMock.mockReturnValue(useContextMockValue);
      const rmockHeade = "A";
      const mockEmploye = {
        id: "5e00928dba3201e530e3f9d1",
        firstName: "Addie",
        lastName: "Harrington",
        dob: "2019-06-06T20:32:36.719Z",
      };
      render(
        <EmployeesCard header={rmockHeade} employeList={[mockEmploye]} />,
        container
      );
    });
    const checkbox = container.querySelector("input");
    expect(checkbox.type).toBe("checkbox");
    expect(checkbox.checked).toEqual(false);
  });
  test("renders checkBox (checked)", () => {
    act(() => {
      const useContextMockValue = {
        selected: [["5e00928dba3201e530e3f9d1"], () => {}],
      };
      useContextMock.mockReturnValue(useContextMockValue);
      const rmockHeade = "A";
      const mockEmploye = {
        id: "5e00928dba3201e530e3f9d1",
        firstName: "Addie",
        lastName: "Harrington",
        dob: "2019-06-06T20:32:36.719Z",
      };
      render(
        <EmployeesCard header={rmockHeade} employeList={[mockEmploye]} />,
        container
      );
    });
    const checkbox = container.querySelector("input");
    expect(checkbox.type).toBe("checkbox");
    expect(checkbox.checked).toEqual(true);
  });
});
