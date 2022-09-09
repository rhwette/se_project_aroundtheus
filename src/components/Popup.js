import { ESC_KEYCODE } from "../utils/constants";

const buttonConfirm = document.querySelector(".popup__container-button_confirm");

class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this.buttonClose = this._popupElement.querySelector(
      ".popup__container-button-close"
    );
    this.close = this.close.bind(this);
    this._closePopupWithRemoteClick =
      this._closePopupWithRemoteClick.bind(this);
    this._closePopupWithEscape = this._closePopupWithEscape.bind(this);
    this.open = this.open.bind(this);
  }

  open() {
    console.log('open the popup...inside popup.js open');
    this._popupElement.classList.add("popup_visible");
    console.log('add classList to show popup');
    this.buttonClose.addEventListener("click", this.close);
    console.log('set the addeventlistener for big X');
    this._popupElement.addEventListener(
      "mousedown",
      this._closePopupWithRemoteClick
    );
    document.addEventListener("keydown", this._closePopupWithEscape);
  }

  close() {
    // debugger;
    console.log('inside close');
    buttonConfirm.removeEventListener("click", () => {
    console.log('remove listener for buttonConfirm');
    // api.removeCard(this._id);
    confirmDeletePopup.close();
    // this._element.remove();
  })

//   this._element
//   .querySelector(".card-grid__garbage")
//   .removeEventListener("click", () => {
// console.log('remove AAAAA');
//   });

this._popupElement.classList.remove("popup_visible");
console.log('after remove listener for buttonConfirm');
    this._popupElement.removeEventListener(
      "mousedown",
      this._closePopupWithRemoteClick
      );
      document.removeEventListener("keydown", this._closePopupWithEscape);
      this.buttonClose.removeEventListener("click", this.close);
      console.log('leave popup.js close');
      
  }

  _closePopupWithEscape(event) {
    if (event.which === ESC_KEYCODE) {
      this.close(event.target);
    }
  }

  _closePopupWithRemoteClick(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}

export default Popup;
