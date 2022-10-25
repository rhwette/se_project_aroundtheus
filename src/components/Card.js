class Card {
  constructor(
    { data, handleZoom },
    cardSelector,
    api,
    userId,
    { handleCan },
    { handleHeart }
  ) {
    this.api = api;
    this._name = data.name;
    this._link = data.link;
    this.likes = data.likes;
    this.userId = userId;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._handleCan = handleCan.bind(this);
    this._handleHeart = handleHeart.bind(this);
    this._handleZoom = handleZoom.bind(this);
    this.addLike = this.addLike.bind(this);
    this.removeLike = this.removeLike.bind(this);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(`#${this._cardSelector}`)
      .content.querySelector('.card-grid__style')
      .cloneNode(true);
    return cardElement;
  }

  addLike() {
    this.cardGridHeart.classList.add('card-grid__icon_active');
  }

  removeLike() {
    this.cardGridHeart.classList.remove('card-grid__icon_active');
  }

  _setEventListeners() {
    // EVENT LISTENER - HEART
    this.element
      .querySelector('.card-grid__icon')
      .addEventListener('click', () => {
        this._handleHeart(this);
      });

    // EVENT LISTENER - GARBAGE CAN
    this.element
      .querySelector('.card-grid__garbage')
      .addEventListener('click', this._handleCan);

    // EVENT LISTENER - IMG TAG
    this.element
      .querySelector('img')
      .addEventListener('click', this._handleZoom);
  }

  //CREATE CARD
  createCard() {
    if (this.likes === undefined) {
      this.likes = [];
    }
    this.element = this._getTemplate();
    const cardGridPicture = this.element.querySelector('.card-grid__picture');
    const cardGridText = this.element.querySelector('.card-grid__text');
    this.cardGridLikes = this.element.querySelector('.card-grid__likes');
    this.cardGridHeart = this.element.querySelector('.card-grid__icon');
    cardGridPicture.src = this._link;
    cardGridPicture.alt = this._name;
    for (let i = 0; i < this.likes.length; i++) {
      if (this.likes[i]._id === this.userId) {
        this.addLike();
      }
    }

    const cardCan = this.element.querySelector('.card-grid__garbage');
    if (this._ownerId != this.userId) {
      cardCan.classList.add('card-grid__garbage-invisible');
    }

    cardGridText.textContent = this._name;
    this.cardGridLikes.textContent = this.likes.length;
    this._setEventListeners();
    return this.element;
  }
}

export default Card;
