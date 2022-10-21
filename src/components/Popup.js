import { ESC_KEYCODE } from '../utils/constants';

class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this.buttonClose = this._popupElement.querySelector(
      '.popup__container-button-close'
    );
    this.close = this.close.bind(this);
    this._closePopupWithRemoteClick =
      this._closePopupWithRemoteClick.bind(this);
    this._closePopupWithEscape = this._closePopupWithEscape.bind(this);
    this.open = this.open.bind(this);
  }

  setEventListeners() {
    this.buttonClose.addEventListener('click', this.close);
    this._popupElement.addEventListener(
      'mousedown',
      this._closePopupWithRemoteClick
    );
  }

  open() {
    this._popupElement.classList.add('popup_visible');
    document.addEventListener('keydown', this._closePopupWithEscape);
  }

  close() {
    this._popupElement.classList.remove('popup_visible');
    document.removeEventListener('keydown', this._closePopupWithEscape);
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
