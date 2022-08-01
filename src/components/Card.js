class Card {
  constructor({ data, handleZoom }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCan = this._handleCan.bind(this);
    this._handleZoom = handleZoom.bind(this);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(`#${this._cardSelector}`)
      .content.querySelector(".card-grid__style")
      .cloneNode(true);
    return cardElement;
  }

  _handleCan() {
    this._element.remove();
    this._element = null;
  }

  _handleHeart(event) {
    event.target.classList.toggle("card-grid__icon_active");
  }

  _setEventListeners() {
    // set listener for Heart
    this._element
      .querySelector(".card-grid__icon")
      .addEventListener("click", this._handleHeart);

    // set listener for Garbage Can
    this._element
      .querySelector(".card-grid__garbage")
      .addEventListener("click", this._handleCan);

    this._element
      .querySelector("img")
      .addEventListener("click", this._handleZoom);
  }

  createCard() {
    this._element = this._getTemplate();
    const cardGridPicture = this._element.querySelector(".card-grid__picture");
    const cardGridText = this._element.querySelector(".card-grid__text");
    cardGridPicture.src = this._link;
    cardGridPicture.alt = this._name;
    cardGridText.textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}

export default Card;
