//FEEDBACK1 USERINFO line 1...remove lines below...pass selectors via arguments
//  then find elements in the constructor
//FEEDBCK USERINFO line 9..use the two class selectors below
//     ".intro__name" and ".intro__occupation"
//      in CONSTANTS to define new selectors
// const nameElement = document.querySelector(".intro__name");
// const aboutMeElement = document.querySelector(".intro__occupation");
// const popupEditProfileName = document.querySelector('input[name ="name"]');
// const popupEditProfileAboutMe = document.querySelector(
//   'input[name = "aboutme"]'
// );

//FEEDBACK1 USERINFO line 9 ..UserInfo must take selectors as constructor arguments
//  store elements, and use them in get and set
export default class UserInfo {
  //   constructor(nameElement, aboutMeElement) {
  //     this.nameElement = nameElement;
  //     this.aboutMeElement = aboutMeElement;
  //   }
  constructor({ nameSelector, aboutMeSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutMeElement = document.querySelector(aboutMeSelector);
  }

  //FEEDBACK1 USERINFO line 15...use a more informative name for this variable
  // getUserInfo() {
  //   const newObj = {
  //     userName: nameElement.textContent,
  //     userJob: aboutMeElement.textContent,
  //   };
  //   return newObj;
  // }

  getUserInfo() {
    const userInfo = {
      userName: this._nameElement.textContent,
      userJob: this._aboutMeElement.textContent,
    };
    console.log("USERINFO.JS userInfo = ", userInfo);
    return userInfo;
  }

  //FEEDBACK1 USERINFO line 22... setters are functions
  //  that accept new values as arguments and set them
  //    replace code below
  // setUserInfo() {
  //   const newNewObj = {
  //     userNameNew: popupEditProfileName.value,
  //     userJobNew: popupEditProfileAboutMe.value,
  //   };
  //    return newNewObj;
  // }

  setUserInfo(name, about) {
    this._nameElement.textContent = name;
    this._aboutMeElement.textContent = about;
  }
}
