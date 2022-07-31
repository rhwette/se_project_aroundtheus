import "./index.css";
import { initialCards, selectors } from "../utils/constants";
import Card from "../components/Card";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import FormValidator from "../components/FormValidator";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
//444444444444444444444444
//  these may need to be added later according to FEEDBACK1 PWF line 11
//    but for now leave these active in PWF or it wont work
const buttonPencil = document.querySelector(".intro__button-pencil");
const buttonPlus = document.querySelector(".intro__button-plus");
// const popupEditProfile = document.querySelector("#editProfileForm");

// const nameElement = document.querySelector(".intro__name");
// const aboutMeElement = document.querySelector(".intro__occupation");
// const popupNewPlace = document.querySelector("#newPlaceForm");
//4444444444444444444444
// buttonPencil.addEventListener("click", open);
// buttonPlus.addEventListener("click", open);

const nameElement = document.querySelector(".intro__name");
const aboutMeElement = document.querySelector(".intro__occupation");
const popupEditProfileName = document.querySelector('input[name ="name"]');
const popupEditProfileAboutMe = document.querySelector(
  'input[name = "aboutme"]'
);

// FEEDBACK1 PWF line 24.. move class instance from PWF to index.js
//  then use it here inside index.js instead of in PWF
console.log("INDEX.JS popupEditProfileName=", popupEditProfileName);
console.log("INDEX.JS popupEditProfileAboutMe", popupEditProfileAboutMe);
//  FEEDBACK1 USERINFO line 9..use 'selectors' object from CONSTANTS
//    as argument in new UserInfo(selectors) below
// const userInfo = new UserInfo(popupEditProfileName, popupEditProfileAboutMe);
const userInfo = new UserInfo(selectors);
console.log("userInfo=", userInfo);

// FEEDBACK1 PWF line 41...fill .values in index.js
//    before opening profile popup
const saveVariableOriginal = userInfo.getUserInfo();
popupEditProfileName.value = saveVariableOriginal.userName;
popupEditProfileAboutMe.value = saveVariableOriginal.userJob;
console.log("saveVariableOriginal =", saveVariableOriginal);

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

//FEEDBACK1 INDEX.JS line 32
// create a renderCard method and then use below
// rewrite the call to SECTION below using a renderCard method
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
  // FEEDBACK1 INDEX line 82 .. use Section class for adding new elements
  //    'cardsSection' is defined below where it is set = new Section
  //    also, dont use container.prepend
  // container.prepend(cardElement.createCard());
  cardsSection.addItem(cardElement.createCard());
};
// FEEDBACK1 INDEX line 29...use better name like 'cardsSection'
//   instead of cardNew
const cardsSection = new Section(
  {
    data: initialCards,
    //FEEDBACK1 INDEX.JS line 32..use the function 'renderCard' here
    renderer: renderCard,
    // renderer: (data) => {
    //   const cardElement = new Card(
    //     {
    //       data,
    //       handleZoom: () => {
    //         imageZoomPopup.open(data);
    //       },
    //     },
    //     selectors.cardTemplate
    //   );
    //   cardsSection.addItem(cardElement.createCard());
    // },
  },
  selectors.cardSection
);

const imageZoomPopup = new PopupWithImage(selectors.previewPopup);
console.log("imageZoomPopup=", imageZoomPopup);

// FEEDBACK1 INDEX.JS line 32 use the function 'renderCard' here
// FEEDBACK1 INDEX.JS line 53 handleFormSubmit should accept input values
//   as an argument and use them to create new card
//   ?????not sure this is right....i dont see where input values are used
//     as argument...check definition of arrow function, maybe the
//     arguments are implied in the destructuring ??
const newPlacePopup = new PopupWithForm({
  popupSelector: selectors.placePopup,
  handleFormSubmit: () => {
    const newCardInfo = newPlacePopup._getInputValues();
    //FEEDBACK1 INDEX line 89... disable submit button
    //  before opening place popup.
    //  Use resetValidation method of the corresponding form validator to do that
    formValidators["formNewPlace"].resetValidation();
    // newCardInfo.name = popupNewPlaceTitle.value;
    // newCardInfo.link = popupNewPlaceLink.value;
    renderCard(newCardInfo);
    newPlacePopup.close();
  },
});

const editProfilePopup = new PopupWithForm({
  popupSelector: selectors.profilePopup,
  handleFormSubmit: () => {
    console.log("newCardInfo=");
    // FEEDBACK1 INDEX.JS line 67 move the prevent.default
    //    to PWF before calling submit handler
    //  NOTE...preventDefault below does not allow editProfile to submit
    // evtSave.preventDefault();
    // FEEDBACK1 PWF line 67...fill profile info in
    //   the handleFormSubmit for editProfile Popup
    // const saveVariableNew = userInfo.setUserInfo();
    // nameElement.textContent = saveVariableNew.userNameNew;
    // aboutMeElement.textContent = saveVariableNew.userJobNew;
    // FEEDBACK1 line 9 use userInfo.setUserInfo to populate profile form
    //    'this.' will not work ??
    //    instead use 'editProfilePopup'
    //     NOTE.. 'popupEditProfileName' and 'popupEditProfileAboutMe'
    //      are defined above here in INDEX
    //     NOTE..  'userInfo' variable is defined above when it is
    //         assigned to the class 'new UserInfo'
    //
    userInfo.setUserInfo(
      editProfilePopup.popupEditProfileName.value,
      editProfilePopup.popupEditProfileAboutMe.value
    );
    editProfilePopup.close();
  },
});

// add button listeners here.
// FEEDBACK1 PWF line 48 ..  move the button listeners over here
//   instead of in PWF.....note that instead of "this"
//   use the constant that is assigned to the new PWF object
buttonPencil.addEventListener(
  "click",
  editProfilePopup.open.bind(editProfilePopup)
);

buttonPlus.addEventListener("click", newPlacePopup.open.bind(newPlacePopup));

// const renderCard = (data, container) => {
//   const cardElement = new Card(
//     {
//       data,
//       handleZoom: () => {
//         newCardPopup.open(data);
//       },
//     },
//     selectors.cardTemplate
//   );
//   container.prepend(cardElement.createCard());
// };

cardsSection.renderItems(initialCards);
// imageZoomPopup.setEventListeners();
// newPlacePopup.setEventListeners();
// editProfilePopup.setEventListeners();

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

const formValidators = {};
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

// if (this.popupSelector === selectors.profilePopup) {
//   buttonPencil.addEventListener("click", this.open.bind(this));
// } else {
//   buttonPlus.addEventListener("click", this.open.bind(this));
// }

// buttonPencil.addEventListener("click", this.open.bind(this));
