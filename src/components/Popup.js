import { ESC_KEYCODE } from "../utils/constants";

// const buttonConfirm = document.querySelector(".popup__container-button_confirm");

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
    console.log('set the addeventlistener for close with big X');
    this._popupElement.addEventListener(
      "mousedown",
      this._closePopupWithRemoteClick
    );
    console.log('set the addeventlistener for close with remote click');
    document.addEventListener("keydown", this._closePopupWithEscape);
    console.log('set the addeventlistener for close with escape');
  }

  close() {

    console.log("clicked on X.. entering popup.js close");
  //   const function7 = () => {
  //     api.removeCard(this._id);
  //     confirmDeletePopup.close();
  //     this._element.remove();
  // }
    // buttonConfirm.removeEventListener("click", function7);

this._popupElement.classList.remove("popup_visible");
console.log("remove visible classList");
    this.buttonClose.removeEventListener("click", this.close);
    console.log("remove big X listener");
    // window.location.reload();
    this._popupElement.removeEventListener(
      "mousedown",
      this._closePopupWithRemoteClick
      );
      console.log('remove remote click listener)');
      document.removeEventListener("keydown", this._closePopupWithEscape);
      console.log("remove close with Escape");
      console.log('leave popup.js close');
      
  }

  _closePopupWithEscape(event) {
    if (event.which === ESC_KEYCODE) {
      this.close(event.target);
      console.log('close with escape)');
    }
  }

  _closePopupWithRemoteClick(event) {
    if (event.target === event.currentTarget) {
      this.close();
      console.log('close with remote click)');
    }
  }
}

export default Popup;
