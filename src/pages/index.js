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
const myOwnerId = "3f769460ee50cd15e754d8b8";

//SHOW LIST OF CARDS FROM SERVER

//GET USER INFO and CARDS from SERVER using Promis.all

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
  {handleCan: function() {
      const confirmDeletePopup = new PopupWithForm({
      popupSelector:selectors.confirmPopup,
        handleFormSubmit: () => {
          this._api.removeCard(this._id)
            .then(res=> {
              confirmDeletePopup.close();
              this._element.remove();
            })
            .catch( (err) => {
              console.log('error=getCardList', err);
            })
          }
        })
        confirmDeletePopup.open(this._btn);
      }
    },
   {handleHeart:function(event) {
        const cardGridLikes = this._element.querySelector(".card-grid__likes");
        if(event.target.classList.length ===1) {
          this._api.addLike(this._id)
            .then(res=> {
              event.target.classList.add("card-grid__icon_active");
              this._likes.length = this._likes.length + 1;
              cardGridLikes.textContent = this._likes.length
            })
            .catch((err) => {
              console.log('error=', err);
            });
        } else{
          event.target.classList.remove("card-grid__icon_active");
          this._api.removeLike(this._id)
            .then(res=> {
              this._likes.length = this._likes.length - 1;
              cardGridLikes.textContent = this._likes.length;
            })
            .catch( (err) => {
              console.log('error=', err);
            })
        }
    }
  }
  )

    cardsSection.addItem(cardElement.createCard());
}

let cardsSection;

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
      .catch((err) => {
        console.log(err)
      })
      .finally( () => {
        btnNewPlaceCreate.innerText = "Create"
      })
    }
  })

  const editProfilePopup = new PopupWithForm( {
    popupSelector: selectors.profilePopup,
    handleFormSubmit: (newUserData) => {
      btnEditProfileSave.innerText = "Saving"
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
        renderAvatar(avatarLink);
        editAvatarPopup.close();
      })
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
  fillProfileForm();
  formValidators["formEditProfile"].resetValidation();
  editProfilePopup.open();
});

//EVENT LISTENER - PLUS BUTTON
buttonPlus.addEventListener("click", () => {
   fillProfileForm();
  formValidators["formNewPlace"].resetValidation();

  newPlacePopup.open();
});

//EVENT LISTENER - AVATAR PENCIL BUTTON
buttonAvatar.addEventListener("click", () => {
  btnEditAvatarSave.innerText = "Save"
  fillProfileForm();
  formValidators["formEditAvatar"].resetValidation();

  editAvatarPopup.open();
});

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



