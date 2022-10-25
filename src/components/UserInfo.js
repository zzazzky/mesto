export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this.profileData = {
      name: this._name.textContent,
      job: this._job.textContent,
    };

    return this.profileData;
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._job.textContent = userData.about;
    this.id = userData._id;
    this._avatar.src = userData.avatar;
    this.cohort = userData.cohort;
  }
}
