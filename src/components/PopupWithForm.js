import Popup from "./Popup";
// import { selectors } from "../components/Constants";
//  the path changed to ../utils/constants.js

// FEEDBACK POPUPWITH FORM  line 1 .. this file should only import 'popup'
//  but it does not work without both
//    even if i put both into 'popup'
import { selectors } from "../utils/constants";
import UserInfo from "../components/UserInfo";

//  according to FEEDBACK PWF line 11 these should be moved to index.js
// const buttonPencil = document.querySelector(".intro__button-pencil");
// const buttonPlus = document.querySelector(".intro__button-plus");
// const nameElement = document.querySelector(".intro__name");
// const aboutMeElement = document.querySelector(".intro__occupation");
// const popupEditProfile = document.querySelector("#editProfileForm");
// const popupNewPlace = document.querySelector("#newPlaceForm");

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    //  FEEDBACK PWF line 14  remove 'this.popupSelector = popupSelector;'
    //    it wont be needed AFTER FIXING CLASS LOGIC
    //    leave it here for now..pencil button doesnt submit without it
    this.popupSelector = popupSelector;
    this.popupEditProfile = document.querySelector("#editProfileForm");
    this.popupEditProfileName = document.querySelector('input[name ="name"]');
    this.popupEditProfileAboutMe = document.querySelector(
      'input[name = "aboutme"]'
    );
    this.popupNewPlaceLink = document.querySelector("#link-input");
    this.popupNewPlaceTitle = document.querySelector("#place-input");
    this._popupForm = this._popupElement.querySelector(".popup__form");

    // FEEDBACK PWF line 56....bind in the constructor then reuse
    //   cant get the syntax right....leave it alone
    this._handleFormSubmit = handleFormSubmit;
    // this._handleFormSubmit = this._handleFormSubmit.bind(this);
    // this._handleFormSubmit = this._handleFormSubmit.bind;

    //  FEEDBACK PWF line 24 .. change name from newInfo to userInfo
    //   move this to index.js
    // this.userInfo = new UserInfo(
    //   this.popupEditProfileName,
    //   this.popupEditProfileAboutMe
    // );
  }

  _getInputValues() {
    const inputs = this._popupForm.querySelectorAll(".popup__container-input");
    const inputObject = {};
    console.log("inputs", inputs);
    inputs.forEach((input) => {
      inputObject[input.name] = input.value;
    });
    return inputObject;
  }

  open(evt) {
    console.log("open in PWF");
    console.log("evt", evt);
    evt.preventDefault();
    super.open();
    // FEEDBACK PWF line 46..add the submit listeners when open a popup
    //   and remove when close
    if (this.popupSelector === selectors.profilePopup) {
      console.log("this._handleFormSubmit", this._handleFormSubmit);
      popupEditProfile.addEventListener(
        "submit",
        //FEEDBACK PWF line 56....bind the method in the constructor
        //   can't get it to work
        // this._handleFormSubmit
        this._handleFormSubmit.bind(this)
      );
    } else {
      popupNewPlace.addEventListener(
        "submit",
        //FEEDBACK PWF line 56....bind the method in the constructor
        //   can't get it to work
        // this._handleFormSubmit
        this._handleFormSubmit.bind(this)
      );
    }
    //  formValidators not defined????
    // formValidators["formNewPlace"].resetValidation();

    // FEEDBACK PWF line 41...fill .values in index.js
    //    before opening profile popup
    // const saveVariableOriginal = this.userInfo.getUserInfo();
    // this.popupEditProfileName.value = saveVariableOriginal.userName;
    // this.popupEditProfileAboutMe.value = saveVariableOriginal.userJob;
  }

  // FEEDBACK PWF line 46 ... remove setEventListener method
  //...add 'submit' Listener when open a popup above and
  //   remove submit Listener when close a popup below
  // FEEDBACK PWF line 48 ... move the click listeners to index.js

  // setEventListeners() {
  // if (this.popupSelector === selectors.profilePopup) {
  //   buttonPencil.addEventListener("click", this.open.bind(this));
  // } else {
  //   buttonPlus.addEventListener("click", this.open.bind(this));
  // }

  // if (this.popupSelector === selectors.profilePopup) {
  //   console.log("this._handleFormSubmit", this._handleFormSubmit);
  //   popupEditProfile.addEventListener(
  //     "submit",
  //     this._handleFormSubmit.bind(this)
  //   );
  // } else {
  //   popupNewPlace.addEventListener(
  //     "submit",
  //     this._handleFormSubmit.bind(this)
  //   );
  // }
  // }

  close() {
    // FEEDBACK PWF line 67 ..  fill profile info in profile form submit handler
    // const saveVariableNew = this._userInfo.setUserInfo();
    // nameElement.textContent = saveVariableNew.userNameNew;
    // aboutMeElement.textContent = saveVariableNew.userJobNew;

    // FEEDBACK PWF line 71 .. no need to remove 'click' listeners..
    //   the buttons are always visible
    // buttonPencil.removeEventListener("click", this.open.bind(this));
    // buttonPlus.removeEventListener("click", this.open.bind(this));

    // FEEDBACK PWF line 46..add the submit listeners when open a popup
    //   and remove when close
    super.close();
    popupEditProfile.removeEventListener(
      "submit",
      //FEEDBACK PWF line 56....bind the method in the constructor
      //   can't get it to work
      // this._handleFormSubmit
      this._handleFormSubmit.bind(this)
    );
    popupNewPlace.removeEventListener(
      "submit",
      //FEEDBACK PWF line 56....bind the method in the constructor
      //   can't get it to work
      // this._handleFormSubmit
      this._handleFormSubmit.bind(this)
    );
    // FEEDBACK PWF line 78  .. reset is needed, but not working like this
    // this._popupForm.reset();
  }
}
