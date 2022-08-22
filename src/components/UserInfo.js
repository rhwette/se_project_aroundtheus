export default class UserInfo {
  constructor({ nameSelector, aboutMeSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutMeElement = document.querySelector(aboutMeSelector);
  }

  getUserInfo() {
    const userInfo = {
      userName: this._nameElement.textContent,
      userJob: this._aboutMeElement.textContent,
    };
    return userInfo;
  }

  setUserInfo(  name, about  ) {
    this._nameElement.textContent = name;
    this._aboutMeElement.textContent = about;
  }
}
