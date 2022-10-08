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
    // const inputs = this._popupForm.querySelectorAll(".popup__container-input");
    const inputObject = {};
    this._inputs.forEach((input) => {
      inputObject[input.name] = input.value;
    });
    return inputObject;
  }


  
  open(btn) {
    super.open();
    //for Pencil Button, at open, the label is set to "Save"
    // if(btn.innerText === "Saving") {
      // btn.innerText = "Save"
    // }
    //for Plus Button, at open, the label is set to "Create"
    // if(btn.innerText === "Creating") {
      // btn.innerText = "Create"
    // }
    //for 'do you really want to delete" button
    //the label is always 'YES'
  
    this._popupForm.addEventListener("submit", this._handleSubmit);
  
};

  close() {
    super.close();
    this._popupForm.removeEventListener("submit", this._handleSubmit);
    this._popupForm.reset();
  }
}
