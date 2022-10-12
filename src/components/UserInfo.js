export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  getUserInfo() {
    this.profileDate = {
      name: this._name.textContent,
      job: this._job.textContent,
    };

    return this.profileDate;
  }

  setUserInfo(name, job) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
}
