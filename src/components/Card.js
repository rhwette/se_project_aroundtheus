import Api from "./Api.js";
import PopupWithForm from "../components/PopupWithForm";
import { selectors } from "../utils/constants";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  authToken: "e81f67bc-340b-41c4-ba13-967f5deca81e"
})

const buttonConfirm = document.querySelector(".popup__container-button_confirm");

class Card {
  constructor({ data, handleZoom }, cardSelector) {
    // this._api = api;
    this._name = data.name;
    this._about = data.about;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._myOwnerId = "3f769460ee50cd15e754d8b8";
    this._id = data._id;
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
      // use try..catch for api's without ".then"
  try {
    const confirmDeletePopup = new PopupWithForm({
    popupSelector:selectors.confirmPopup,
    handleFormSubmit: () => {
        api.removeCard(this._id);
        confirmDeletePopup.close();
        this._element.remove();
    }
  })
  const btn = document.getElementById("buttonConfirmDeleteYes");
  confirmDeletePopup.open(btn);
  } catch( Error) {
    console.log('error=', Error);
  }
}

  _handleHeart(event) {
    // use try..catch for api's without ".then"
    try{
      const cardGridLikes = this._element.querySelector(".card-grid__likes");
      if(event.target.classList.length ===1) {
        api.addLike(this._id);
        event.target.classList.add("card-grid__icon_active");
        this._likes.length = this._likes.length + 1;
        cardGridLikes.textContent = this._likes.length;
  
    } else{
        event.target.classList.remove("card-grid__icon_active");
        api.removeLike(this._id);
        this._likes.length = this._likes.length - 1;
        cardGridLikes.textContent = this._likes.length;
    };

    } catch( Error) {
      console.log('error=', Error);
    }
   }

  _setEventListeners() {
    // EVENT LISTENER - HEART
    this._element
      .querySelector(".card-grid__icon")
      .addEventListener("click", this._handleHeart.bind(this));

    // EVENT LISTENER - GARBAGE CAN
    this._element
      .querySelector(".card-grid__garbage")
      .addEventListener("click", this._handleCan.bind(this));

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
      if(this._likes[i]._id === "3f769460ee50cd15e754d8b8") {
        cardHeart.classList.add("card-grid__icon_active");
      }
    }
    
    const cardCan = this._element.querySelector(".card-grid__garbage");
    if (this._ownerId != this._myOwnerId) {
      cardCan.classList.add("card-grid__garbage-invisible");
    }

    cardGridText.textContent = this._name;
    cardGridLikes.textContent = this._likes.length;
    this._setEventListeners();
    return this._element;
  }
}

export default Card;
