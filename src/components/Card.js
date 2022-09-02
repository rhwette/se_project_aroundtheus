// import { getCacheDir } from "gh-pages";
import Api from "../components/api.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  authToken: "e81f67bc-340b-41c4-ba13-967f5deca81e"
})
// debugger
class Card {
  constructor({ data, handleZoom }, cardSelector) {
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
    // debugger;

    console.log('owner id =',this._ownerId);
    console.log('this._myOwnerId=', this._myOwnerId);
    if(this._ownerId === this._myOwnerId) {
      console.log('this._element=', this._element);
      console.log('ids are equal, ok to delete');
      console.log('this._id=', this._id);
      api.removeCard(this._id);
      this._element.remove();
    }
    else {
      console.log('not the same id,,,dont delete');
        window.alert("sorry, but you are not authorized to delete this card");
    }
  
  };



  
  _handleHeart(event) {
    // debugger;
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

  }

  _setEventListeners() {
    // set listener for Heart
    this._element
      .querySelector(".card-grid__icon")
      .addEventListener("click", this._handleHeart.bind(this));

    // set listener for Garbage Can
    this._element
      .querySelector(".card-grid__garbage")
      .addEventListener("click", this._handleCan);

    this._element
      .querySelector("img")
      .addEventListener("click", this._handleZoom);
  }

  createCard() {
    if(this._likes === undefined){
      this._likes = [];
    }
    console.log('this =', this);
console.log("CREATCARD this._likes =", this._likes);
console.log("CREATCARD this._likes.lenght =", this._likes.length);
    this._element = this._getTemplate();
    const cardHeart = this._element.querySelector(".card-grid__icon");
    const cardGridPicture = this._element.querySelector(".card-grid__picture");
    const cardGridText = this._element.querySelector(".card-grid__text");
    const cardGridLikes = this._element.querySelector(".card-grid__likes");
    cardGridPicture.src = this._link;
    cardGridPicture.alt = this._name;
    // debugger;
    for(let i = 0; i < this._likes.length; i++) {
      if(this._likes[i]._id === "3f769460ee50cd15e754d8b8") {
        cardHeart.classList.add("card-grid__icon_active");
      }
    }
    cardGridText.textContent = this._name;
    cardGridLikes.textContent = this._likes.length;
    this._setEventListeners();
    return this._element;
  }
}

export default Card;
