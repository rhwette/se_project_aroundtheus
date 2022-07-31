// //  FEEDBACK1 CARDS.JS (line1) - files which contain class declarations should not import anything
//    also, not that the import below wasnt being used anyway
// import { openPopup, closePopup } from "./Utils.js";

//FB2 line 8
//  Card is not responsible for preview image..
//   remove this line and line  below
// const containerElementImage = document.querySelector("#image-popup-container");

// these two are not used
// const imageZoom = document.getElementById("image-zoom");
// const imageZoomText = document.querySelector(".image-popup__picture-text");

class Card {
  constructor({ data, handleZoom }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;

    //FB2 line 8
    //  Card is not responsible for preview image..
    //   remove this line and line 1
    // this._containerElementImage = containerElementImage;

    // FEEDBACK1 CARDS.JS (line13) - good....passing the handler with the arguments (of the contstructor)
    //  is the right way....that way the Card is only responsible for card rendering

    // FEEDBACK1 CARDS.JS (line 25) -  add this._handleCan in the constructor
    this._handleCan = this._handleCan.bind(this);

    // FEEDBACK1 CARDS.JS (line 46) - better to bind methods in the constructor,
    // FEEDBACK1- instead of down below where the method is called
    // FEEDBACK1 - also note, right side has no 'this._'
    this._handleZoom = handleZoom.bind(this);
    // this._handleZoom = handleZoom;

    // FB2 CARD line 11 ..remove line,
    //   it is handled by previous line
    // this._handleZoom = handleZoom;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(`#${this._cardSelector}`)
      .content.querySelector(".card-grid__style")
      .cloneNode(true);
    return cardElement;
  }

  _handleCan() {
    // FEEDBACK1 CARDS.JS (line 25) - we want to remove 'this._element.remove()'
    // FEEDBACK1 -  not the parentElement
    // FEEDBACK1-  so include 'this._handleCan = this._handleCan.bind(this);'
    // FEEDBACK1 -  in the class constructor
    // this.parentElement.remove();
    this._element.remove();

    // FB2 CARD line 24 (suggested)
    //  The best thing to do after deleting a card
    //    is to remove the link to the DOM element:
    //    'this._element = null;'
    //     It helps javascript garbage collector.
    //  see >  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management
    this._element = null;
  }

  //  FEEDBACK1 CARDS.JS (line 28) - good - each callback is a separate method
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

    // add EventListener for zoomPic
    // FEEDBACK1 CARDS.JS (line 46) - better to bind methods in the constructor,
    // FEEDBACK1    not in the spot where the method is used
    // .addEventListener("click", this._handleZoom.bind(this));
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
