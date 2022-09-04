import "./index.css";
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
  authToken: "e81f67bc-340b-41c4-ba13-967f5deca81e",
})

const buttonAvatar = document.querySelector('.intro__image-overlay');
const buttonPencil = document.querySelector(".intro__button-pencil");
const buttonPlus = document.querySelector(".intro__button-plus");
const popupEditProfileName = document.querySelector('input[name ="name"]');
const popupEditProfileAbout = document.querySelector(
  'input[name = "about"]'
  );
  
const userInfo = new UserInfo(selectors);

api.getUserInfo().then(userData => {
  userInfo.setUserInfo(
    userData.name,
    userData.about,
    userData.avatar,
  )
  console.log('userData=', userData);
}
);

const newCardPopup = new PopupWithImage(selectors.previewPopup);
const renderCard = (data) => {
  console.log("data = ", data);
  const cardElement = new Card(
    {
      data,
      handleZoom: () => {
        newCardPopup.open(data);
      },
    },
    selectors.cardTemplate
  );
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
    console.log('cardsSection=', cardsSection);
    cardsSection.renderItems(cardsFromServer);
    }
  );

// add new card from server
const  newPlacePopup = new PopupWithForm({
  popupSelector: selectors.placePopup,
  handleFormSubmit: (newCardInfo) => {
    api.addCard(newCardInfo).then(res => {
      console.log("res =", res);
    renderCard(res);
    newPlacePopup.close();
    })
  }
})

const editProfilePopup = new PopupWithForm( {
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

  const editAvatarPopup = new PopupWithForm({
    popupSelector: selectors.avatarPopup,
      handleFormSubmit: ( avatarLink  ) => {
      api.addAvatar(avatarLink).then(res => {
      renderAvatar(avatarLink);
      editAvatarPopup.close();
      })
    }
  })

  function renderAvatar( {avatarLink} ) {
    const avatarNew = document.getElementById("introImage");
    avatarNew.src = avatarLink;
  }

function fillProfileForm() {
    const userData = userInfo.getUserInfo();
    popupEditProfileName.value = userData.userName;
    popupEditProfileAbout.value = userData.userJob;
  }   

buttonPencil.addEventListener("click", () => {
  fillProfileForm();
  // formValidators["formEditProfile"].resetValidation();

  //use code below to change 'SAVE' to 'SAVING'
    const btn = document.getElementById("buttonEditProfileSave");
    btn.addEventListener('click', () => {
      if(btn.innerText === "Save") {
        btn.innerText = "Saving"
      }
    })

  editProfilePopup.open();
});

buttonPlus.addEventListener("click", () => {
  // formValidators["formNewPlace"].resetValidation();

  //use code below to change 'CREATE' to 'SAVING'
    const btn = document.getElementById("buttonNewPlaceCreate");
    btn.addEventListener('click', () => {
      if(btn.innerText === "Create") {
        btn.innerText = "Saving"
      }
    })

  newPlacePopup.open();
});

buttonAvatar.addEventListener("click", () => {
  // formValidators["formEditAvatar"].resetValidation();

  //use code below to change 'SAVE' to 'SAVING'
    const btn = document.getElementById("buttonEditAvatarSave");
    btn.addEventListener('click', () => {
      if(btn.innerText === "Save") {
        btn.innerText = "Saving"
      }
    })

  editAvatarPopup.open();
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



