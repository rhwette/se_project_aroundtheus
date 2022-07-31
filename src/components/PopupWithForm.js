import Popup from "./Popup";
// import { selectors } from "../components/Constants";
//  the path changed to ../utils/constants.js

// FEEDBACK1 POPUPWITH FORM  line 1 .. this file should only import 'popup'
//  but it does not work without both
//    even if i put both into 'popup'

// FB2 PWF line 32....seems like this import is not required
// import { selectors } from "../utils/constants";
import UserInfo from "../components/UserInfo";
import { formValidators } from "../pages/index";

//  according to FEEDBACK1 PWF line 11 these should be moved to index.js
// const buttonPencil = document.querySelector(".intro__button-pencil");
// const buttonPlus = document.querySelector(".intro__button-plus");
// const nameElement = document.querySelector(".intro__name");
// const aboutMeElement = document.querySelector(".intro__occupation");
// const popupEditProfile = document.querySelector("#editProfileForm");
// const popupNewPlace = document.querySelector("#newPlaceForm");

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    //  FEEDBACK1 PWF line 14  remove 'this.popupSelector = popupSelector;'
    //    it wont be needed AFTER FIXING CLASS LOGIC
    // FB2 PWF line 32....seems like this import is not required
    // this.popupSelector = popupSelector;
    this.popupEditProfile = document.querySelector("#editProfileForm");
    this.popupEditProfileName = document.querySelector('input[name ="name"]');
    this.popupEditProfileAboutMe = document.querySelector(
      'input[name = "aboutme"]'
    );
    this.popupNewPlaceLink = document.querySelector("#link-input");
    this.popupNewPlaceTitle = document.querySelector("#place-input");
    this._popupForm = this._popupElement.querySelector(".popup__form");

    // FEEDBACK1 PWF line 56....bind in the constructor then reuse
    //'this._handleFormSubmit' is just a variable
    // 'handleFormSubmit' is a function
    // 'handleFormSubmit()' is a function that is invoked
    // to bind the variable to the function do this...
    this._handleFormSubmit = handleFormSubmit.bind(this);

    //  FEEDBACK1 PWF line 24 .. change name from newInfo to userInfo
    //     also don't create class instances inside other classes
    //     instead, move this to index.js
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
    console.log("FormValidaotrs inside open=", formValidators);
    console.log("open in PWF");
    console.log("evt", evt);

    // FB2 PWF line 30
    //  There is no need to prevent the default event behavior here
    // evt.preventDefault();
    super.open();
    // FEEDBACK1 PWF line 46..add the submit listeners when open a popup
    //   and remove when close
    // FB2 PWF line 32
    //  You should add the listener to 'this._popupForm',
    //    don't use the specific elements in general classes.
    this._popupForm.addEventListener("submit", this._handleFormSubmit);
    //  can omit lines below that use specific elements
    // if (this.popupSelector === selectors.profilePopup) {
    //   popupEditProfile.addEventListener(
    //     "submit",
    //     //FEEDBACK1 PWF line 56....bind the method in the constructor
    //     //  then use it here
    //     this._handleFormSubmit
    //   );
    // } else {
    //   popupNewPlace.addEventListener(
    //     "submit",
    //     //FEEDBACK1 PWF line 56....bind the method in the constructor
    //     //  then use it here
    //     this._handleFormSubmit
    //   );
    // }
    //  formValidators not defined????
    // formValidators["formNewPlace"].resetValidation();

    // FEEDBACK1 PWF line 41...fill .values in index.js
    //    before opening profile popup
    // const saveVariableOriginal = this.userInfo.getUserInfo();
    // this.popupEditProfileName.value = saveVariableOriginal.userName;
    // this.popupEditProfileAboutMe.value = saveVariableOriginal.userJob;
  }

  // FEEDBACK1 PWF line 46 ... remove setEventListener method
  //...add 'submit' Listener when open a popup above and
  //   remove submit Listener when close a popup below

  // FEEDBACK1 PWF line 48 ... move the CLICK listeners to index.js
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
    // FEEDBACK1 PWF line 67 ..  fill profile info in profile form submit handler
    // const saveVariableNew = this._userInfo.setUserInfo();
    // nameElement.textContent = saveVariableNew.userNameNew;
    // aboutMeElement.textContent = saveVariableNew.userJobNew;

    // FEEDBACK1 PWF line 71 .. no need to remove 'click' listeners..
    //   the buttons are always visible
    // buttonPencil.removeEventListener("click", this.open.bind(this));
    // buttonPlus.removeEventListener("click", this.open.bind(this));

    // FEEDBACK1 PWF line 46..add the submit listeners when open a popup
    //   and remove when close
    super.close();
    // FB2 PWF line 41
    //  You should remove the listener from 'this._popupForm',
    //    don't use the specific elements in general classes.
    this._popupForm.removeEventListener("submit", this._handleFormSubmit);

    // popupEditProfile.removeEventListener(
    //   "submit",

    //FEEDBACK1 PWF line 56....bind the method in the constructor
    //  then use it here
    // this._handleFormSubmit
    // this._handleFormSubmit.bind(this)
    // );
    // popupNewPlace.removeEventListener(
    //   "submit",
    //FEEDBACK1 PWF line 56....bind the method in the constructor
    //  then use it here
    // this._handleFormSubmit
    // this._handleFormSubmit.bind(this)
    // );

    // FB2 INDEX.JS line65
    //  You should reset validation before opening the popup,
    //    not here,
    //    because you reset the form every time when popup is closed,
    //    so it should not show errors when you open it,
    //    even if it was not submitted
    formValidators["formNewPlace"].resetValidation();
    formValidators["formEditProfile"].resetValidation();

    // FEEDBACK1 PWF line 78  .. reset is needed, but not working like this
    this._popupForm.reset();
  }
}
