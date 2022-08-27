import "./index.css";
// import { initialCards, selectors } from "../utils/constants";
import { selectors } from "../utils/constants";
import Card from "../components/Card";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import FormValidator from "../components/FormValidator";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import Api from "../components/api.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  authToken: "e81f67bc-340b-41c4-ba13-967f5deca81e"
})
// debugger;
// const authToken = api._authToken;
// console.log('authToken=', authToken);
// console.log('api.authToken=', api._authToken);




const buttonPencil = document.querySelector(".intro__button-pencil");
const buttonPlus = document.querySelector(".intro__button-plus");
const nameElement = document.querySelector(".intro__name");
const aboutElementgetCardList = document.querySelector(".intro__occupation");
const avatarElement = document.querySelector(".intro__image");
const popupEditProfileName = document.querySelector('input[name ="name"]');
const popupEditProfileAbout = document.querySelector(
  'input[name = "about"]'
  );
  
const userInfo = new UserInfo(selectors);

// use code below to test 'removeCard'
// select an Id from the network panel
// api.removeCard("6304c8a81f5d6a0d6f33c2b0").then(res => console.log(res));
  
  api.getUserInfo().then(userData => {
    userInfo.setUserInfo(
      userData.name,
      userData.about,
      userData.avatar,
    )
    console.log('userData=', userData);
  }
  );



  // const userData = userInfo.getUserInfo();
  // popupEditProfileName.value = userData.userName;
  // popupEditProfileAbout.value = userData.userJob;


const popupNewPlaceLink = document.querySelector("#link-input");
const popupNewPlaceTitle = document.querySelector("#place-input");
const containerElementPerson = document.querySelector(
  "#person-popup-container"
);
const containerElementPicture = document.querySelector(
  "#picture-popup-container"
);
const popupElement = document.querySelector(".popup__container");
const containerForImages = document.querySelector(".card-grid__format");

const newCardPopup = new PopupWithImage(selectors.previewPopup);


const renderCard = (data) => {
  const cardElement = new Card(
    {
      data,
      handleZoom: () => {
        newCardPopup.open(data);
      },
    },
    selectors.cardTemplate
  );
  // console.log(cardElement._id);
  cardsSection.addItem(cardElement.createCard());
};


let cardsSection;
  api.getCardList().then(cardsFromServer => {
    cardsSection = new Section({
      data : cardsFromServer,
      renderer : renderCard,
    },
    selectors.cardSection
    );
    console.log('cardsFromServer=',cardsFromServer);
    // console.log(cardsFromServer[0]._id);
    console.log('cardsSection=', cardsSection);
    // console.log('api._authToken=', authToken);
    cardsSection.renderItems(cardsFromServer);
    }
  );


const imageZoomPopup = new PopupWithImage(selectors.previewPopup);


// add new card from server
const newPlacePopup = new PopupWithForm({
  popupSelector: selectors.placePopup,
  handleFormSubmit: (newCardInfo) => {
    api.addCard(newCardInfo).then(res => {
    renderCard(newCardInfo);
    newPlacePopup.close();
    })
  }
})


const editProfilePopup = new PopupWithForm({
  popupSelector: selectors.profilePopup,
  handleFormSubmit: (newUserData) => {
  userInfo.setUserInfo(newUserData.name, newUserData.about)
  const name = newUserData.name;
  const about = newUserData.about;
  api.addUserInfo( {name, about})
  editProfilePopup.close()
   }
  }
  );

function fillProfileForm() {
    const userData = userInfo.getUserInfo();
    popupEditProfileName.value = userData.userName;
    popupEditProfileAbout.value = userData.userJob;
  }   

buttonPencil.addEventListener("click", () => {
  fillProfileForm();
  formValidators["formEditProfile"].resetValidation();
  editProfilePopup.open();
});

buttonPlus.addEventListener("click", () => {
  formValidators["formNewPlace"].resetValidation();
  newPlacePopup.open();
});

//-----------------------------------------------
//  VALIDATION
//-----------------------------------------------
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__container-input",
  submitButtonSelector: ".popup__container-button",
  inactiveButtonClass: "popup__container-button-disabled",
  inputErrorClass: "popup__container-input-type-error",
  errorClass: "popup__container-error-visible",
};

export const formValidators = {};
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(config);



