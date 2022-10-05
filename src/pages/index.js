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
const buttonCan = document.querySelector('.card-grid__garbage');
const buttonAvatar = document.querySelector('.intro__image-overlay');
const buttonPencil = document.querySelector(".intro__button-pencil");
const buttonPlus = document.querySelector(".intro__button-plus");
const popupEditProfileName = document.querySelector('input[name ="name"]');
const popupEditProfileAbout = document.querySelector(
  'input[name = "about"]'
  );
  
const userInfo = new UserInfo(selectors);

//SHOW LIST OF CARDS FROM SERVER
api.getCardList().then(res => {
  console.log(res);
})
.catch((err) => {
  console.log(err)
});

//GET USER INFO from SERVER
api.getUserInfo().then(userData => {
  userInfo.setUserInfo(
    userData.name,
    userData.about,
    userData.avatar,
  )
  //use catch here instead of in api.js
  .catch((err) => {
    console.log(err)
  });
}
);

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
    cardsSection.renderItems(cardsFromServer);
    }
  )
  .catch((err) => {
    console.log(err)
  });

//NEW PLACE POPUP
const  newPlacePopup = new PopupWithForm({
  popupSelector: selectors.placePopup,
  handleFormSubmit: (newCardInfo) => {
    api.addCard(newCardInfo).then(res => {
    renderCard(res);
    newPlacePopup.close();
    })
        .catch((err) => {
        console.log(err)
    });
  }
})

//EDIT PROFILE POPUP
const editProfilePopup = new PopupWithForm( {
  popupSelector: selectors.profilePopup,
  handleFormSubmit: async (newUserData) => {
      // handleFormSubmit:  (newUserData) => {
    console.log('newUserData=', newUserData);
    console.log('newUserData.name=', newUserData.name);
    console.log('newUserData.about=', newUserData.about);
    userInfo.setUserInfo(newUserData.name, newUserData.about)
    const name = newUserData.name;
    const about = newUserData.about;
    const avatar = newUserData.avatar;
    console.log('name=', name);
    console.log('about=', about);
     await api.addUserInfo( {name, about})
      //  api.addUserInfo( {name, about})
    editProfilePopup.close()
    // window.location.reload();
  }
  }
  );

  //EDIT AVATAR POPUP
  const editAvatarPopup = new PopupWithForm({
    popupSelector: selectors.avatarPopup,
      handleFormSubmit: ( avatarLink  ) => {
      api.addAvatar(avatarLink).then(res => {
      renderAvatar(avatarLink);
      editAvatarPopup.close();
      })
      //use catch here instead of in api.js
      .catch((err) => {
      console.log(err)
  });
    }
  })

function renderAvatar( {avatarLink} ) {
  console.log('avatarLink=', avatarLink);
  const avatarNew = document.getElementById("introImage");
  avatarNew.src = avatarLink;
}

function fillProfileForm() {
    const userData = userInfo.getUserInfo();
    popupEditProfileName.value = userData.userName;
    popupEditProfileAbout.value = userData.userJob;
}   


//EVENT LISTENERS -----------------------

//EVENT LISTENER - PENCIL BUTTON
buttonPencil.addEventListener("click", () => {
  // debugger;
  
  fillProfileForm();
  formValidators["formEditProfile"].resetValidation();
  
  // CHANGE 'SAVE' to 'SAVING'
  const btn = document.getElementById("buttonEditProfileSave");
    btn.addEventListener('click', () => {
      if(btn.innerText === "Save") {
        btn.innerText = "Saving"
      }
    })

  editProfilePopup.open(btn);
});

//EVENT LISTENER - PLUS BUTTON
buttonPlus.addEventListener("click", () => {
  formValidators["formNewPlace"].resetValidation();

  // CHANGE 'Create' to 'Creating'
    const btn = document.getElementById("buttonNewPlaceCreate");
    btn.addEventListener('click', () => {
      if(btn.innerText === "Create") {
        btn.innerText = "Creating"
      }
    })

  newPlacePopup.open(btn);
});

//EVENT LISTENER - AVATAR PENCIL BUTTON
buttonAvatar.addEventListener("click", () => {
  formValidators["formEditAvatar"].resetValidation();

  // CHANGE 'SAVE' to 'SAVING'
    const btn = document.getElementById("buttonEditAvatarSave");
    btn.addEventListener('click', () => {
      if(btn.innerText === "Save") {
        btn.innerText = "Saving"
      }
    })

  editAvatarPopup.open(btn);
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



