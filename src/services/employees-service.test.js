import EmployeesSeervice from "./employees-service";

beforeEach(() => {
  global.fetch = jest.fn().mockImplementation(() => {
    var p = new Promise((resolve, reject) => {
      resolve({
        ok: true,
        json: () => {
          return [
            {
              id: "5e00928dba3201e530e3f9d1",
              firstName: "Addie",
              lastName: "Harrington",
              dob: "2019-06-06T20:32:36.719Z",
            },
          ];
        },
      });
    });

    return p;
  });
});

describe("EmployeesSeervice class testing", () => {
  test("should return data ", async () => {
    const mockEmploye = {
      id: "5e00928dba3201e530e3f9d1",
      firstName: "Addie",
      lastName: "Harrington",
      dob: "2019-06-06T20:32:36.719Z",
    };
    const emplServ = new EmployeesSeervice();
    const response = await emplServ.getEmployees();
    expect(response[0]).toEqual(mockEmploye);
  });
});
