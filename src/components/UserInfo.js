export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }, userId) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._userId = userId;
  }

  getUserInfo() {
    const userInfo = {
      userName: this._nameElement.textContent,
      userJob: this._aboutElement.textContent,
      userAvatar: this._avatarElement.src,
      userId: this._userId
    };
    return userInfo;
  }
  
  setUserInfo(  name, about, avatar, userId  ) {
    // setUserInfo(  name, about, avatar ) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    if(avatar !== undefined) {
      this._avatarElement.src = avatar;
    };
    // console.log('userId=', userId);
    this._userId = userId
    // console.log('this._userId=', this._userId);
  }

  setUserId(userId) {
    this._userId = userId;
    console.log('this._userId=', this._userId);
  }
}
