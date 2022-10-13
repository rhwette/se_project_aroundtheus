import "./index.css";
import { selectors, config } from "../utils/constants";
import Card from "../components/Card";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import FormValidator from "../components/FormValidator";
import PopupWithForm from "../components/PopupWithForm";
import UserInfo from "../components/UserInfo";
import Api from "../components/Api.js";

const btnEditProfileSave = document.getElementById("buttonEditProfileSave");
const btnNewPlaceCreate = document.getElementById("buttonNewPlaceCreate");
const btnEditAvatarSave = document.getElementById("buttonEditAvatarSave");
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

//GET USER INFO and CARDS from SERVER using Promis.all

//CODE 30

Promise.all([api.getUserInfo(), api.getCardList()])
.then(([userData, cardsFromServer]) => {
  userInfo.setUserInfo(
    userData.name,
    userData.about,
    userData.avatar,
  );
  cardsSection = new Section(
  {
    data : cardsFromServer,
    renderer : renderCard,
  },
  selectors.cardSection
  );
  cardsSection.renderItems(cardsFromServer);
  })
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
    },
    //99999999999999999999999999999999999999999999999999999
    //see CODE06  ....the below does not work....use 'try..catch' above instead
    // {handleCan: function() {
    //   const confirmDeletePopup = new PopupWithForm({
    //     popupSelector:selectors.confirmPopup,
    //     handleFormSubmit: () => {
    //       this._api.removeCard(this._id)
    //       .then(res => {
    //         confirmDeletePopup.close();
    //         this._element.remove();
    //         confirmDeletePopup.open(this._btn)
    //       }
    //   )
    //      .catch( (err) => {
    //        console.log('error=getCardList', err);
    //      })
    //     }
    //   })
    //  }
    // },
    //99999999999999999999999999999999999999999999999999999

{
  _handleHeart(event) {
    // use try..catch for api's without ".then"
    try{
      const cardGridLikes = this._element.querySelector(".card-grid__likes");
      if(event.target.classList.length ===1) {
        // api.addLike(this._id);
        this._api.addLike(this._id);
        event.target.classList.add("card-grid__icon_active");
        this._likes.length = this._likes.length + 1;
        cardGridLikes.textContent = this._likes.length;
    } else{
        event.target.classList.remove("card-grid__icon_active");
        // api.removeLike(this._id);
        this._api.removeLike(this._id);
        this._likes.length = this._likes.length - 1;
        cardGridLikes.textContent = this._likes.length;
    };
    } catch( Error) {
      console.log('error=', Error);
    }
   }
}
  )
  cardsSection.addItem(cardElement.createCard());
};

let cardsSection;
  // api.getCardList().then(cardsFromServer => {
  //   cardsSection = new Section({
  //     data : cardsFromServer,
  //     renderer : renderCard,
  //   },
  //   selectors.cardSection
  //   );
  //   cardsSection.renderItems(cardsFromServer);
  //   }
  // )
    //use catch here instead of in api.js
  // .catch((err) => {
  //   console.log(err)
  // });

//NEW PLACE POPUP
const  newPlacePopup = new PopupWithForm({
  popupSelector: selectors.placePopup,
    handleFormSubmit: (newCardInfo) => {
      btnNewPlaceCreate.innerText = "Creating"
      api.addCard(newCardInfo)
      .then(res => {
        renderCard(res);
        newPlacePopup.close();
      })
      //use catch here instead of in api.js
      .catch((err) => {
        console.log(err)
      })
      .finally( () => {
        btnNewPlaceCreate.innerText = "Create"
      })
    }
  })

//EDIT PROFILE POPUP
// const editProfilePopup = new PopupWithForm( {
//   popupSelector: selectors.profilePopup,
//   handleFormSubmit: async (newUserData) => {
//     // handleFormSubmit:  (newUserData) => {
//       btnEditProfileSave.innerText = "Saving"
//       console.log('newUserData1=', newUserData);
      
//       userInfo.setUserInfo(newUserData.name, newUserData.about)
//       const name = newUserData.name;
//       const about = newUserData.about;
//       const avatar = newUserData.avatar;
//     await api.addUserInfo( {name, about})
//     //  api.addUserInfo( {name, about})
//          editProfilePopup.close()
//   }
//   }
//   );
  const editProfilePopup = new PopupWithForm( {
    popupSelector: selectors.profilePopup,
    handleFormSubmit: (newUserData) => {
      btnEditProfileSave.innerText = "Saving"
      console.log('newUserData-', newUserData);
      userInfo.setUserInfo(newUserData.name, newUserData.about)
      const name = newUserData.name;
      const about = newUserData.about;
      const avatar = newUserData.avatar;
      api.addUserInfo( {name, about} )
      .then(res => {
        editProfilePopup.close();
      })
      .catch( (err) => {
        console.log(err)
      })
      .finally( () => {
        btnEditProfileSave.innerText = "Save"
      })
    }
  })

  //EDIT AVATAR POPUP
  const editAvatarPopup = new PopupWithForm({
    popupSelector: selectors.avatarPopup,
    handleFormSubmit: ( avatarLink  ) => {
      btnEditAvatarSave.innerText = "Saving"
      api.addAvatar(avatarLink)
      .then(res => {
          // avatarNew.src = avatarLink;
      renderAvatar(avatarLink);
        editAvatarPopup.close();
      })
      //use catch here instead of in api.js
      .catch((err) => {
        console.log(err)
      })
      .finally( () => {
        btnEditAvatarSave.innerText = "Save"
      })
    }
  })

function renderAvatar( {avatarLink} ) {
  const avatarNew = document.getElementById("introImage");
  console.log('avatarNew.src=', avatarNew.src);
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
  // btnEditProfileSave.innerText = "Save"
  fillProfileForm();
  formValidators["formEditProfile"].resetValidation();
  
  // Listen for click on save button then CHANGE 'SAVE' to 'SAVING'
    // btn.addEventListener('click', () => {
    //     btn.innerText = "Saving"
    // })

  editProfilePopup.open();
});

//EVENT LISTENER - PLUS BUTTON
buttonPlus.addEventListener("click", () => {
  //  btnNewPlaceCreate.innerText = "Create"
   fillProfileForm();
  formValidators["formNewPlace"].resetValidation();

  // Listen for click on create button then CHANGE 'Create' to 'Creating'
    // btn.addEventListener('click', () => {
    //     btn.innerText = "Creating"
    // })

  newPlacePopup.open();
});

//EVENT LISTENER - AVATAR PENCIL BUTTON
buttonAvatar.addEventListener("click", () => {
  btnEditAvatarSave.innerText = "Save"
  fillProfileForm();
  formValidators["formEditAvatar"].resetValidation();

  // Listen for click on save button then CHANGE 'SAVE' to 'SAVING'
    // btn.addEventListener('click', () => {
    //     btn.innerText = "Saving"
    // })

  editAvatarPopup.open();
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
console.log('test');
enableValidation(config);



