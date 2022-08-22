import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.image = this._popupElement.querySelector(".image-popup__picture-zoom");
  }
  open({ link, name }) {
    const imageName = this._popupElement.querySelector(
      ".image-popup__picture-text"
    );
    imageName.textContent = name;

    this.image.src = link;
    this.image.alt = `Photo of ${name}`;
    super.open();
  }
}
