import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit.bind(this);
  }

  _handleSubmit = (event) => {
    event.preventDefault();
    const values = this._getInputValues();
    this._handleFormSubmit(values);
  };

  _getInputValues() {
    const inputs = this._popupForm.querySelectorAll(".popup__container-input");
    const inputObject = {};
    inputs.forEach((input) => {
      inputObject[input.name] = input.value;
    });
    return inputObject;
  }

  open(evt) {
    super.open();
    this._popupForm.addEventListener("submit", this._handleSubmit);
    // this._popupForm.addEventListener("submit", () => {
    //     this._handleSubmit;
    //     document.body.innerHTML = document.body.innerHTML.replace('Save', 'Saving');
    
  
};

  close() {
    super.close();
    this._popupForm.removeEventListener("submit", this._handleSubmit);
    this._popupForm.reset();
  }
}
