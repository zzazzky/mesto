export default class Api {
  constructor(apiSettings) {
    this.baseUrl = apiSettings.baseUrl;
    this.contentType = apiSettings.headers["Content-Type"];
    this.authorization = apiSettings.headers.authorization;
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: this.authorization,
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch(err => console.log(err));
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: this.authorization,
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .catch(err => console.log(err));
  }

  editProfile(newName, newAbout) {
    fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.authorization,
        "Content-Type": this.contentType,
      },
      body: JSON.stringify([
        {
          name: newName,
          about: newAbout,
        },
      ]),
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  editAvatar() {
    fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this.authorization,
        "Content-Type": this.contentType,
      },
      body: JSON.stringify([
        {
          avatar: "",
        },
      ]),
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  addCard() {
    fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this.authorization,
        "Content-Type": this.contentType,
      },
      body: JSON.stringify([
        {
          name: "",
          link: "",
        },
      ]),
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
}
