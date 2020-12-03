export default class EmployeesSeervice {
  _apiBase = 'https://yalantis-react-school-api.yalantis.com/api';

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, recived ${res.status} `)
    }
    return await res.json();
  }

  async getEmployees() {
    return this.getResource(`/task0/users`);
  }
}




