import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit.bind(this);
    this._inputs = this._popupForm.querySelectorAll(".popup__container-input");
  }

  _handleSubmit = (event) => {
    event.preventDefault();
    const values = this._getInputValues();
    this._handleFormSubmit(values);
  };

  _getInputValues() {
    const inputObject = {};
    this._inputs.forEach((input) => {
      inputObject[input.name] = input.value;
    });
    return inputObject;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener("submit", this._handleSubmit); 
  }
  
 
  // open(btn) {
  //   super.open();
  //   this.setEventListeners();
  // };

  close() {
    super.close();
    // this._popupForm.removeEventListener("submit", this._handleSubmit);
    this._popupForm.reset();
  }
}
