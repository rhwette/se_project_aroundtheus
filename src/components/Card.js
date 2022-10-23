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
    this._likes = data.likes;
    // this._userId = userId;
    this.userId = userId;
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

    // NOTE per line 104 suggestion
    //  recast the listener for the heart
    // from ............
    // this.element
    //   .querySelector('.card-grid__icon')
    //   .addEventListener('click', this._handleHeart);
    // to..........
    // console.log('this=', this);
    // console.log('this.element=', this.element);
    // console.log('this.element.classList=', this.element.classList);
    this.element
      .querySelector('.card-grid__icon')
      .addEventListener('click', () => {
        this._handleHeart(this);
      });

    // EVENT LISTENER - GARBAGE CAN
    // this._element
    this.element
      .querySelector('.card-grid__garbage')
      .addEventListener('click', this._handleCan);

    // EVENT LISTENER - IMG TAG
    // this._element
    this.element
      .querySelector('img')
      .addEventListener('click', this._handleZoom);
  }

  //CREATE CARD
  createCard() {
    if (this._likes === undefined) {
      this._likes = [];
    }
    // this._element = this._getTemplate();
    this.element = this._getTemplate();
    // const cardHeart = this._element.querySelector('.card-grid__icon');
    const cardHeart = this.element.querySelector('.card-grid__icon');
    // const cardGridPicture = this._element.querySelector('.card-grid__picture');
    const cardGridPicture = this.element.querySelector('.card-grid__picture');
    // const cardGridText = this._element.querySelector('.card-grid__text');
    const cardGridText = this.element.querySelector('.card-grid__text');
    // const cardGridLikes = this._element.querySelector('.card-grid__likes');
    const cardGridLikes = this.element.querySelector('.card-grid__likes');
    cardGridPicture.src = this._link;
    cardGridPicture.alt = this._name;
    for (let i = 0; i < this._likes.length; i++) {
      // if (this._likes[i]._id === this._userId) {
      if (this._likes[i]._id === this.userId) {
        cardHeart.classList.add('card-grid__icon_active');
      }
    }

    // const cardCan = this._element.querySelector('.card-grid__garbage');
    const cardCan = this.element.querySelector('.card-grid__garbage');
    // if (this._ownerId != this._userId) {
    if (this._ownerId != this.userId) {
      cardCan.classList.add('card-grid__garbage-invisible');
    }

    cardGridText.textContent = this._name;
    cardGridLikes.textContent = this._likes.length;
    this._setEventListeners();
    // return this._element;
    return this.element;
  }
}

export default Card;
