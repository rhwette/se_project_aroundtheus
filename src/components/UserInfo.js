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
    console.log("USERINFO.JS userInfo = ", userInfo);
    return userInfo;
  }

  setUserInfo(name, about) {
    this._nameElement.textContent = name;
    this._aboutMeElement.textContent = about;
    console.log("name=", name);
    console.log("about=", about);
    console.log(
      "this._nameElement.textContent=",
      this._nameElement.textContent
    );
    console.log(
      "this._aboutMeElement.textContent=",
      this._aboutMeElement.textContent
    );
  }
}
