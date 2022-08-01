import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this.popupEditProfile = document.querySelector("#editProfileForm");
    this.popupEditProfileName = document.querySelector('input[name ="name"]');
    this.popupEditProfileAboutMe = document.querySelector(
      'input[name = "aboutme"]'
    );
    this.popupNewPlaceLink = document.querySelector("#link-input");
    this.popupNewPlaceTitle = document.querySelector("#place-input");
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit.bind(this);
  }

  _handleSubmit = (event) => {
    event.preventDefault();
    const values = this._getInputValues();
    console.log("values=", values);
    this._handleFormSubmit(values);
  };

  _getInputValues() {
    const inputs = this._popupForm.querySelectorAll(".popup__container-input");
    const inputObject = {};
    console.log("inputs", inputs);
    console.log("inputObject=", inputObject);
    inputs.forEach((input) => {
      inputObject[input.name] = input.value;
    });
    return inputObject;
  }

  open(evt) {
    console.log("open in PWF");
    console.log("evt", evt);

    super.open();
    this._popupForm.addEventListener("submit", this._handleSubmit);
  }

  close() {
    super.close();
    this._popupForm.removeEventListener("submit", this._handleSubmit);
    this._popupForm.reset();
  }
}
