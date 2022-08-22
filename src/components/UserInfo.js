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
    console.log("0003 USERINFO.JS userInfo = ", userInfo);
    return userInfo;
  }

  setUserInfo( { name, about } ) {
    console.log("AAAA USERINFO.js name=", name);
    console.log("BBBB USERINFO about=", about);
    this._nameElement.textContent = name;
    this._aboutMeElement.textContent = about;
    console.log(
      "CCCC USERINFO this._nameElement.textContent=",
      this._nameElement.textContent
    );
    console.log(
      "DDDD USERINFO this._aboutMeElement.textContent=",
      this._aboutMeElement.textContent
    );

  }
}
