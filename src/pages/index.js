import './index.css';
import { selectors, config } from '../utils/constants';
import Card from '../components/Card';
import Section from '../components/Section';
import PopupWithImage from '../components/PopupWithImage';
import FormValidator from '../components/FormValidator';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';
import Api from '../components/Api.js';

const btnEditProfileSave = document.getElementById('buttonEditProfileSave');
const btnNewPlaceCreate = document.getElementById('buttonNewPlaceCreate');
const btnEditAvatarSave = document.getElementById('buttonEditAvatarSave');
const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-12',
  authToken: 'e81f67bc-340b-41c4-ba13-967f5deca81e',
});
const buttonCan = document.querySelector('.card-grid__garbage');
const buttonAvatar = document.querySelector('.intro__image-overlay');
const buttonPencil = document.querySelector('.intro__button-pencil');
const buttonPlus = document.querySelector('.intro__button-plus');
const popupEditProfileName = document.querySelector('input[name ="name"]');
const popupEditProfileAbout = document.querySelector('input[name = "about"]');

const userInfo = new UserInfo(selectors);

const confirmDeletePopup = new PopupWithForm({
  popupSelector: selectors.confirmPopup,
  handleFormSubmit: () => {
    const cardElement = confirmDeletePopup.currentCardElement;
    cardElement.api
      .removeCard(cardElement._id)
      .then((res) => {
        confirmDeletePopup.close();
        cardElement.element.remove();
      })
      .catch((err) => {
        console.log('error=getCardList', err);
      });
  },
});
confirmDeletePopup.setEventListeners();

//SHOW LIST OF CARDS FROM SERVER
//GET USER INFO and CARDS from SERVER using Promise.all

Promise.all([api.getUserInfo(), api.getCardList()])
  .then(([userData, cardsFromServer]) => {
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
      userId: userData._id,
    });
    cardsSection = new Section(
      {
        data: cardsFromServer,
        renderer: renderCard,
      },
      selectors.cardSection
    );
    cardsSection.renderItems(cardsFromServer);
  })
  .catch((err) => {
    console.log(err);
  });

//  newCardPopup
const newCardPopup = new PopupWithImage(selectors.previewPopup);
newCardPopup.setEventListeners();

//  renderCard, including handleZoom, handleCan, handleHeart
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
    userInfo.userId,
    {
      handleCan: function () {
        confirmDeletePopup.currentCardElement = cardElement;
        confirmDeletePopup.open(cardElement);
      },
    },
    {
      handleHeart: function (card) {
        if (card.cardGridHeart.classList.length === 1) {
          api
            .addLike(card._id)
            .then((res) => {
              card.addLike();
              card.likes = res.likes;
              card.cardGridLikes.textContent = card.likes.length;
            })
            .catch((err) => {
              console.log('error=', err);
            });
        } else {
          api
            .removeLike(card._id)
            .then((res) => {
              card.removeLike();
              card.likes = res.likes;
              card.cardGridLikes.textContent = card.likes.length;
            })
            .catch((err) => {
              console.log('error=', err);
            });
        }
      },
    }
  );

  cardsSection.addItem(cardElement.createCard());
};

let cardsSection;

//NEW PLACE POPUP
const newPlacePopup = new PopupWithForm({
  popupSelector: selectors.placePopup,
  handleFormSubmit: (newCardInfo) => {
    btnNewPlaceCreate.innerText = 'Creating...';
    api
      .addCard(newCardInfo)
      .then((res) => {
        renderCard(res);
        newPlacePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        btnNewPlaceCreate.innerText = 'Create';
      });
  },
});

newPlacePopup.setEventListeners();

//EDIT PROFILE POPUP
const editProfilePopup = new PopupWithForm({
  popupSelector: selectors.profilePopup,
  handleFormSubmit: (newUserData) => {
    btnEditProfileSave.innerText = 'Saving...';
    const name = newUserData.name;
    const about = newUserData.about;
    const avatar = newUserData.avatar;
    api
      .addUserInfo({ name, about })
      .then((res) => {
        userInfo.setUserInfo({
          name: res.name,
          about: res.about,
          avatar: res.avatar,
          userId: res._id,
        });
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        btnEditProfileSave.innerText = 'Save';
      });
  },
});
editProfilePopup.setEventListeners();

//EDIT AVATAR POPUP
const editAvatarPopup = new PopupWithForm({
  popupSelector: selectors.avatarPopup,
  handleFormSubmit: (avatarLink) => {
    btnEditAvatarSave.innerText = 'Saving...';
    api
      .addAvatar(avatarLink)
      .then((res) => {
        renderAvatar(avatarLink);
        editAvatarPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        btnEditAvatarSave.innerText = 'Save';
      });
  },
});
editAvatarPopup.setEventListeners();

function renderAvatar({ avatarLink }) {
  userInfo.setUserInfo({ avatar: avatarLink });
}

function fillProfileForm() {
  const userData = userInfo.getUserInfo();
  popupEditProfileName.value = userData.userName;
  popupEditProfileAbout.value = userData.userJob;
}

//EVENT LISTENERS -----------------------

//EVENT LISTENER - PENCIL BUTTON
buttonPencil.addEventListener('click', () => {
  fillProfileForm();
  formValidators['formEditProfile'].resetValidation();
  editProfilePopup.open();
});

//EVENT LISTENER - PLUS BUTTON
buttonPlus.addEventListener('click', () => {
  fillProfileForm();
  formValidators['formNewPlace'].resetValidation();

  newPlacePopup.open();
});

//EVENT LISTENER - AVATAR PENCIL BUTTON
buttonAvatar.addEventListener('click', () => {
  fillProfileForm();
  formValidators['formEditAvatar'].resetValidation();

  editAvatarPopup.open();
});

export const formValidators = {};
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);
