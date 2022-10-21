class Card {
  constructor(
    { data, handleZoom },
    cardSelector,
    api,
    userId,
    { handleCan },
    { handleHeart }
  ) {
    this._api = api;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._handleCan = handleCan.bind(this);
    this._handleHeart = handleHeart.bind(this);
    this._handleZoom = handleZoom.bind(this);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(`#${this._cardSelector}`)
      .content.querySelector('.card-grid__style')
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    // EVENT LISTENER - HEART
    this._element
      .querySelector('.card-grid__icon')
      .addEventListener('click', this._handleHeart);

    // EVENT LISTENER - GARBAGE CAN
    this._element
      .querySelector('.card-grid__garbage')
      .addEventListener('click', this._handleCan);

    // EVENT LISTENER - IMG TAG
    this._element
      .querySelector('img')
      .addEventListener('click', this._handleZoom);
  }

  //CREATE CARD
  createCard() {
    if (this._likes === undefined) {
      this._likes = [];
    }
    this._element = this._getTemplate();
    const cardHeart = this._element.querySelector('.card-grid__icon');
    const cardGridPicture = this._element.querySelector('.card-grid__picture');
    const cardGridText = this._element.querySelector('.card-grid__text');
    const cardGridLikes = this._element.querySelector('.card-grid__likes');
    cardGridPicture.src = this._link;
    cardGridPicture.alt = this._name;
    for (let i = 0; i < this._likes.length; i++) {
      if (this._likes[i]._id === this._userId) {
        cardHeart.classList.add('card-grid__icon_active');
      }
    }

    const cardCan = this._element.querySelector('.card-grid__garbage');
    if (this._ownerId != this._userId) {
      cardCan.classList.add('card-grid__garbage-invisible');
    }

    cardGridText.textContent = this._name;
    cardGridLikes.textContent = this._likes.length;
    this._setEventListeners();
    return this._element;
  }
}

export default Card;
