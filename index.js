
//-----------------------------------------------
// associate Elements with classes or ID's
//    introButtonPencilElement = button that activates form "Edit Profile"
//    nameElement = starting name on page
//    aboutMeElement = starting occupation on page
//    popupButtonSave = the 'SAVE' button on 'editProfile' form
//    popupButtonCreate = the 'Create' button on 'newPlace' Form
//    popupButtonCloseEditProfile = 'big X' on 'editProfile' form
//    popupButtonCloseNewPlace = 'big X' on 'newPlace' form
//    popupName = the name entered on form
//    popupAboutMe = the occupation enterd on form
//    introButtonPlusElement = button that activates form "New Place"
//-----------------------------------------------

const introButtonPencilElement = document.querySelector('.intro__button-pencil');
const nameElement = document.querySelector(".intro__name");
const aboutMeElement = document.querySelector(".intro__occupation");
const popupButtonSave = document.querySelector("#popupButtonSave");
const popupButtonCloseEditProfile = document.querySelector('#popupButtonCloseEditProfile');
const popupButtonCreate = document.querySelector("#popupButtonCreate");
const popupButtonCloseNewPlace = document.querySelector('#popupButtonCloseNewPlace');
const popupButtonCloseZoomPic = document.querySelector('#popupButtonCloseZoomPic');
const popupName = document.querySelector('input[name ="name"]');
const popupAboutMe = document.querySelector('input[name = "aboutme"]');
const introButtonPlusElement = document.querySelector('.intro__button-plus');


//  ARRAY of OBJECTS containing image links
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
]; 

//
// use cardIndex as permanent ID for all elements in Template
//    including initial cards and any added cards
// note: element id's must not start with a number, so will need a prefix for each 
//
  
//-----------------------------------------------  
//  myTEMPLATE TO DRAW INITIAL CARDS
//-----------------------------------------------
   const userTemplate = document.querySelector('#myTemplate');
    for (let i = 0; i < initialCards.length; i++) {

      // li element
    userTemplate.content.querySelector('li').id = `listElement${[i]}`;
    const listElement = userTemplate.content.querySelector('li');
    
      // card image
    userTemplate.content.querySelector('img').className = 'card-grid__picture';
    userTemplate.content.querySelector('img').src = initialCards[i]["link"];
    userTemplate.content.querySelector('img').alt = initialCards[i]["name"];
    userTemplate.content.querySelector('img').id = `cardImage${[i]}`;
    const cardImage = userTemplate.content.querySelector('img');
    
      // card can  
    userTemplate.content.querySelector('.canSymbol').id = `cardCan${[i]}`;
    const cardCan = userTemplate.content.querySelector('.card-grid__garbage');

      // card words
    userTemplate.content.querySelector('#cardName').id = `cardName${[i]}`;
    userTemplate.content.querySelector('h2').textContent = initialCards[i]["name"];
    userTemplate.content.querySelector('h2').className = "card-grid__text block";

      // card heart
    userTemplate.content.querySelector('.heartSymbol').id = `heartButton${[i]}`;
    userTemplate.content.querySelector('.heartSymbol').name = 'heartButton';
    const heartButton = userTemplate.content.querySelector('.heartSymbol');
      
      // assign clone
    const clone = document.importNode(userTemplate.content, true);

      // append clone to ul element within the list elements
    document.querySelector('ul').appendChild(clone);

      // add EventListeners for all cardCan and cardImage
    const currentCan = document.querySelector(`#cardCan${[i]}`);
    currentCan.addEventListener('click', removePic);

    const currentCardImage = document.querySelector(`#cardImage${[i]}`);
    currentCardImage.addEventListener('click', zoomPic);

      // reset cardIndex at each loop
      // at end of looping, cardIndex will be (initialCards.length -1)
      // each element above will keep index permanently
    cardIndex = i;

    }

//-----------------------------------------------
//  FUNCTION 'removePic'
//-----------------------------------------------

    function removePic(evtRemove) {
    let canId = evtRemove.target.id;
    let cardCanId = canId.charAt(canId.length-1);
    const cardToDelete = document.querySelector(`#listElement${[cardCanId]}`);
    cardToDelete.remove();
}
 
//-----------------------------------------------
//  FUNCTION 'zoomPic'
//-----------------------------------------------

    function zoomPic (currentImage) {
    let cardImageId = currentImage.target.id;
    let cardImageIndex= cardImageId.charAt(imageId.length-1);
    const zoomElement = document.querySelector(".image-popup");

    zoomElement.querySelector('#image-zoom').className = "card-grid__picture";

    zoomElement.querySelector('#image-zoom').src = `url(${popupLink.value.imageIndex})`; 
        
    document.querySelector('.image-zoom').append(zoomElement);
    const containerElement = document.querySelector('#image-popup-container');
    containerElement.classList.add('popup-container_visible');
  }

//-----------------------------------------------
//  LISTEN - click on big X zoomPic
//-----------------------------------------------
    popupButtonCloseZoomPic.addEventListener('click', closeZoom);

//-----------------------------------------------
//  FUNCTION 'closeZoom'
//-----------------------------------------------
    function closeZoom() {
    const containerElement = document.querySelector('#image-popup-container');
    containerElement.classList.remove('popup-container_visible');
    zoomElement.remove();
}

//***********************************************
//-----------------------------------------------
// 'EDIT PROFILE POPUP'
//-----------------------------------------------
//***********************************************

//-----------------------------------------------
//  LISTEN for clicks on introButtonPencil and on popupButtonSAVE
//-----------------------------------------------
    introButtonPencilElement.addEventListener('click', openProfilePopup);
    popupButtonSave.addEventListener('click', saveProfile);

//-----------------------------------------------
//  FUNCTION 'openProfilePopup'
//-----------------------------------------------  
    function openProfilePopup(evtEditProfile) {
    popupName.value = nameElement.textContent;
    popupAboutMe.value = aboutMeElement.textContent;
    const containerElement = document.querySelector('#person-popup-container');
    containerElement.classList.add('popup-container_visible');
}
//-----------------------------------------------
//  FUNCTION 'saveProfile'
//-----------------------------------------------
    function  saveProfile (evtSave) {
    evtSave.preventDefault();
    if (popupName.value === "" || popupAboutMe.value === "") {
    alert("please fill out the form before submitting");
    } else {  
    nameElement.textContent = popupName.value;
    aboutMeElement.textContent = popupAboutMe.value;
    closeProfilePopup()}
}

//-----------------------------------------------
//  LISTEN - click on big X 'editProfile' form
//-----------------------------------------------
    popupButtonCloseEditProfile.addEventListener('click', closeProfilePopup);

//-----------------------------------------------
//  FUNCTION 'closeProfilePopup'
//-----------------------------------------------
    function closeProfilePopup() {
    const containerElement = document.querySelector('#person-popup-container');
    containerElement.classList.remove('popup-container_visible');
}


//***********************************************
//-----------------------------------------------
// 'NEW PLACE POPUP'
//-----------------------------------------------
//***********************************************

//-----------------------------------------------
//  LISTEN for clicks on introButtonPlus and on popupButtonCreate
//-----------------------------------------------
    introButtonPlusElement.addEventListener('click', openAddCardPopup);
    popupButtonCreate.addEventListener('click', createButton);

//-----------------------------------------------
//  FUNCTION 'openAddCardPopup'
//-----------------------------------------------  
    function openAddCardPopup(evtNewPlace) {
    const popupTitle = document.querySelector('#place');
    const popupLink = document.querySelector('#link');

    // popupTitle.value = "";
    // popupLink.value = "";
    // popupTitle.value.reset();
    // popupLink.value.reset();

    const containerElement = document.querySelector('#picture-popup-container');
    containerElement.classList.add('popup-container_visible');
    //   popupTitle.value.reset();
    // popupLink.value.reset();
  }

//-----------------------------------------------
//  FUNCTION 'createButton'
//-----------------------------------------------
    function  createButton (evtCreate) {
    evtCreate.preventDefault();
    const popupTitle = document.querySelector('#place');
    const popupLink = document.querySelector('#link');
    if (popupTitle.value === "" || popupLink.value === "") {
    alert("please fill out the form before submitting");
    } else {
   //--------------------------------------------
   // DRAW NEW CARD 
   //--------------------------------------------
    cardIndex = cardIndex + 1;
    const userTemplate = document.querySelector('#myTemplate');

  // li element
    userTemplate.content.querySelector('li').id = `listElement${cardIndex}`;
    const listElement = userTemplate.content.querySelector('li');

  // card image
    const popupLink = document.querySelector('#link');
    const popupTitle = document.querySelector('#place');
    userTemplate.content.querySelector('img').className = 'card-grid__picture';
    userTemplate.content.querySelector('img').src = popupLink.value;
    userTemplate.content.querySelector('img').alt = popupTitle.value;
    // userTemplate.content.querySelector('img').id = `newImage${cardIndex}`;
    userTemplate.content.querySelector('img').id = `image${cardIndex}`;
    // const newImageId =  userTemplate.content.querySelector('img').id = `newImage${cardIndex}`;
    const image = userTemplate.content.querySelector('img');

  // card can  
    // userTemplate.content.querySelector('.can-image').id = `newCan${cardIndex}`;
    userTemplate.content.querySelector('.can-image').id = `canButton${cardIndex}`;
    const canButton = userTemplate.content.querySelector('.card-grid__garbage');

  // card words
    userTemplate.content.querySelector('h2').textContent = popupTitle.value;
    userTemplate.content.querySelector('h2').className = "card-grid__text block";

  // card heart
    // userTemplate.content.querySelector('.heart-image').id = `newHeart${cardIndex}`;
    userTemplate.content.querySelector('.heart-image').id = `heartButton${cardIndex}`;
    userTemplate.content.querySelector('.heart-image').name = 'heartButton';
 

    const clone = document.importNode(userTemplate.content, true);
    document.querySelector('ul').prepend(clone);
    const currentHeartElement = document.querySelector(`#newHeart${cardIndex}`);
    // const currentCanElement = document.querySelector(`#newCan${cardIndex}`);
    const currentCanElement = document.querySelector(`#canButton${cardIndex}`);
    const currentImage = document.querySelector(`#image${cardIndex}`);
    currentCanElement.addEventListener('click', removePic);
    // currentHeartElement.addEventListener('click', changeHeartColor);
    currentImage.addEventListener('click', zoomPic);
    
    closeAddCardPopup();
  }
}
 

//-----------------------------------------------
//  LISTEN - click on big X 'newPlace' form
//-----------------------------------------------
    popupButtonCloseNewPlace.addEventListener('click', closeAddCardPopup);


//-----------------------------------------------
//  FUNCTION 'closeAddCardPopup'
//-----------------------------------------------
    function closeAddCardPopup() {
    const containerElement = document.querySelector('#picture-popup-container');
    containerElement.classList.remove('popup-container_visible');
}

//------------------------------------------------
//  HEART ICON
//------------------------------------------------

    const cardGridIcon = document.querySelectorAll('.heart-image');
    for (let i = 0; i < cardGridIcon.length; i++) {
    cardGridIcon[i].addEventListener('click',changeHeartColor);
}

    function changeHeartColor(anynameEvent) {
    console.log('anynameEvent', anynameEvent)

    if (document.getElementById(anynameEvent.target.id).src===
      "http://127.0.0.1:5500/images/heart.svg") {
    document.getElementById(anynameEvent.target.id).src = "images/Union.svg";
    } else {
    document.getElementById(anynameEvent.target.id).src = "images/heart.svg";
    }
}
