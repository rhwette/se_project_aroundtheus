export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }, userId) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this.userId = userId;
  }

  getUserInfo() {
    const userInfo = {
      userName: this._nameElement.textContent,
      userJob: this._aboutElement.textContent,
      userAvatar: this._avatarElement.src,
      userId: this.userId,
    };
    console.log('userInfo.userId inside UserInfo=', userInfo.userId);
    return userInfo;
  }

  setUserInfo({ name, about, avatar, userId }) {
    if (name) this._nameElement.textContent = name;
    if (about) this._aboutElement.textContent = about;
    if (avatar) this._avatarElement.src = avatar;
    if (userId) this.userId = userId;
  }
}
