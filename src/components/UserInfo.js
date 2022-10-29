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

  setProfileDescription({name, about}) {
    this._name.textContent = name;
    this._job.textContent = about;
  }

  setAvatar(avatarLink) {
    this._avatar.src = avatarLink;
  }

  setUserInfo(userData) {
    this.setProfileDescription({name: userData.name, about: userData.about});
    this.setAvatar(userData.avatar);
    this.id = userData._id;
    this.cohort = userData.cohort;
  }


}
