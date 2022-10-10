import "./index.css";
import { selectors, config } from "../utils/constants";
import Card from "../components/Card";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import FormValidator from "../components/FormValidator";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import Api from "../components/Api.js";


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
//should be some way to download myOwnerId from server
//but instead found value of myOwnerId by creating a new card 
const myOwnerId = "3f769460ee50cd15e754d8b8";

//SHOW LIST OF CARDS FROM SERVER

//GET USER INFO from SERVER
api.getUserInfo().then(userData => {
  userInfo.setUserInfo(
    userData.name,
    userData.about,
    userData.avatar,
  )
}
)
//use catch here instead of in api.js
.catch((err) => {
  console.log(err)
});

const newCardPopup = new PopupWithImage(selectors.previewPopup);

const renderCard = (data) => {
  //include api, myOwnerId, and handleCan in arguments of Card
  const cardElement = new Card(
    {
      data,
      handleZoom: () => {
        newCardPopup.open(data);
      },
    },
    selectors.cardTemplate,
    api,
    myOwnerId,
    //put anon function from handle can
    //note: if use "function" instead of '=>', then 
    //   this._api and thi._element are available from card.js
    {handleCan: function() {
//       // use try..catch for api's without ".then"
       try {
         const confirmDeletePopup = new PopupWithForm({
         popupSelector:selectors.confirmPopup,
         handleFormSubmit: () => {
         this._api.removeCard(this._id);
         confirmDeletePopup.close();
         this._element.remove();
       } 
     })
       confirmDeletePopup.open(this._btn);
       } catch( Error) {
        console.log('error=getCardList', Error);
       }
     }
    }
  )

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
    //use catch here instead of in api.js
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
      //use catch here instead of in api.js
        .catch((err) => {
        console.log(err)
    });
  }
})

//EDIT PROFILE POPUP
const editProfilePopup = new PopupWithForm( {
  popupSelector: selectors.profilePopup,
  handleFormSubmit: async (newUserData) => {
    userInfo.setUserInfo(newUserData.name, newUserData.about)
    const name = newUserData.name;
    const about = newUserData.about;
    const avatar = newUserData.avatar;
     await api.addUserInfo( {name, about})
    editProfilePopup.close()
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
  const btn = document.getElementById("buttonEditProfileSave");
       btn.innerText = "Save"
  fillProfileForm();
  formValidators["formEditProfile"].resetValidation();
  
  // Listen for click on save button then CHANGE 'SAVE' to 'SAVING'
    btn.addEventListener('click', () => {
        btn.innerText = "Saving"
    })

  editProfilePopup.open(btn);
});

//EVENT LISTENER - PLUS BUTTON
buttonPlus.addEventListener("click", () => {
  const btn = document.getElementById("buttonNewPlaceCreate");
        btn.innerText = "Create"
        fillProfileForm();
  formValidators["formNewPlace"].resetValidation();

  // Listen for click on create button then CHANGE 'Create' to 'Creating'
    btn.addEventListener('click', () => {
        btn.innerText = "Creating"
    })

  newPlacePopup.open(btn);
});

//EVENT LISTENER - AVATAR PENCIL BUTTON
buttonAvatar.addEventListener("click", () => {
  const btn = document.getElementById("buttonEditAvatarSave");
      btn.innerText = "Save"
  fillProfileForm();
  formValidators["formEditAvatar"].resetValidation();

  // Listen for click on save button then CHANGE 'SAVE' to 'SAVING'
    btn.addEventListener('click', () => {
        btn.innerText = "Saving"
    })

  editAvatarPopup.open(btn);
});

//-----------------------------------------------
//  VALIDATION
//-----------------------------------------------
// const config = {
//   formSelector: ".popup__form",
//   inputSelector: ".popup__container-input",
//   submitButtonSelector: ".popup__container-button",
//   inactiveButtonClass: "popup__container-button-disabled",
//   inputErrorClass: "popup__container-input-type-error",
//   errorClass: "popup__container-error-visible",
// };

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



