// import { getCacheDir } from "gh-pages";
import Api from "../components/api.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  authToken: "e81f67bc-340b-41c4-ba13-967f5deca81e"
})
// debugger
// console.log('api.authToken=', this._authToken);
class Card {
  constructor({ data, handleZoom }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._myOwnerId = "3f769460ee50cd15e754d8b8";
    this._id = data._id;
    this._cardSelector = cardSelector;
    this._handleCan = this._handleCan.bind(this);
    this._handleZoom = handleZoom.bind(this);
    // this._authToken = authToken;
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
      api.removeCard(this._id);
      this._element.remove();
    }
    else {
      console.log('not the same id,,,dont delete');
        window.alert("sorry, but you are not authorized to delete this card");
    }
  

    // this._element = null;
  };

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
    const cardGridLikes = this._element.querySelector(".card-grid__likes");
    cardGridPicture.src = this._link;
    cardGridPicture.alt = this._name;
    cardGridText.textContent = this._name;
    cardGridLikes.textContent = this._likes.length;
    this._setEventListeners();
    return this._element;
  }
}


export default Card;
