// const buttonConfirm = document.querySelector(".popup__container-button_confirm");
// const btn = document.getElementById("buttonConfirmDeleteYes");

// const userId = "3f769460ee50cd15e754d8b8";


class Card {
    constructor({ data, handleZoom }, cardSelector, api, userId, {handleCan}, {handleHeart}) {
      // constructor({ data, handleZoom }, cardSelector, api, {handleCan}, {handleHeart}) {
    this._api = api;
    this._name = data.name;
    // this._btn = btn;
    // this._about = data.about;
    this._link = data.link;
    this._likes = data.likes;
    // this._ownerId = data.owner._id;
    // this._ownerId = data.owner_id;
    // this._myOwnerId = data.owner_id;
    // this._myOwnerId = myOwnerId;
    // this._userId = userData_id;
    // NOTE: userId is either hard-coded or gotten from server ONE time at the beginning
    //     see index.js 'api.getUserInfo' line 36-48
    // NOTE: ownerId = ?? is the owner Id of the card which may or may not = userId


    // this._userId = userData._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._handleCan = handleCan.bind(this);
    this._handleHeart = handleHeart.bind(this);
    this._handleZoom = handleZoom.bind(this);
    console.log('this._userId=', this._userId);
  }
 

  _getTemplate() {
    const cardElement = document
      .querySelector(`#${this._cardSelector}`)
      .content.querySelector(".card-grid__style")
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    // EVENT LISTENER - HEART
    this._element
      .querySelector(".card-grid__icon")
      .addEventListener("click", this._handleHeart);

    // EVENT LISTENER - GARBAGE CAN
    this._element
      .querySelector(".card-grid__garbage")
      .addEventListener("click", this._handleCan);

    // EVENT LISTENER - IMG TAG
    this._element
      .querySelector("img")
      .addEventListener("click", this._handleZoom);
  }

  //CREATE CARD
  createCard() {
    if(this._likes === undefined){
      this._likes = [];
    }
    this._element = this._getTemplate();
    const cardHeart = this._element.querySelector(".card-grid__icon");
    const cardGridPicture = this._element.querySelector(".card-grid__picture");
    const cardGridText = this._element.querySelector(".card-grid__text");
    const cardGridLikes = this._element.querySelector(".card-grid__likes");
    cardGridPicture.src = this._link;
    cardGridPicture.alt = this._name;
    for(let i = 0; i < this._likes.length; i++) {
            // console.log('this._ownerId=',this._ownerId);
            // console.log('this._userId=',this._userId);
        // if(this._likes[i]._id === this._myOwnerId) { 
          if(this._likes[i]._id === this._userId) {
        cardHeart.classList.add("card-grid__icon_active");
      }
    }
    
    const cardCan = this._element.querySelector(".card-grid__garbage");
    // if (this._ownerId != this._myOwnerId) {
      if (this._ownerId != this._userId) {
      console.log('this._ownerId=',this._ownerId);
      console.log('this._userId=',this._userId);
      cardCan.classList.add("card-grid__garbage-invisible");
    }

    cardGridText.textContent = this._name;
    cardGridLikes.textContent = this._likes.length;
    this._setEventListeners();
    return this._element;
  }
}

export default Card;
