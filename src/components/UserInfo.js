export default class UserInfo {a
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    // this._avatarNew = document.getElementById("introImage");
  }

  getUserInfo() {
    const userInfo = {
      userName: this._nameElement.textContent,
      userJob: this._aboutElement.textContent,
      userAvatar: this._avatarElement.src,
    };
    // console.log('userInfo=', userInfo);
    // console.log('avatar=',this._avatarElement.src);
    return userInfo;
  }
  
  setUserInfo(  name, about, avatar  ) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    if(avatar !== undefined) {
      this._avatarElement.src = avatar;
      // this._avatarElement.src = avatarLink;
      console.log('avatar=', avatar);
    }
    
  }
}
