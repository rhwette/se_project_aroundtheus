import "./index.css";
import { selectors, config } from "../utils/constants";
import Card from "../components/Card";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage";
import FormValidator from "../components/FormValidator";
// import Popup from "../components/Popup";
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

//99999999999999999999999999999999999999999999999
const confirmDeletePopup = new PopupWithForm({
  popupSelector:selectors.confirmPopup,
    handleFormSubmit: () => {
      const cardElement = confirmDeletePopup._currentCardElement;
      cardElement._api.removeCard(cardElement._id)
        .then(res=> {
          confirmDeletePopup.close();
          cardElement._element.remove();
        })
        .catch( (err) => {
          console.log('error=getCardList', err);
        })
      }
    })
    confirmDeletePopup.setEventListeners();

//999999999999999999999999999999999999999999999999


//add 'popup' code 02
// const popup = new Popup();

// const userId = "3f769460ee50cd15e754d8b8";

//NOTE:  userData contains: name , about, avatar, _id, cohort#
//NOTE:  data contains: Likes (an array), _id (of the person liking), 
//       name (of the picture location), link (to the picture), 
//       owner (object with same info as userData)

// api.getUserInfo()
// .then((userData) => {
//   userInfo.setUserId(
//     userData._id
//     );
// console.log('userData._idx=', userData._id);
// })
//   .catch( (err) => {
//     console.log(err)
//   })
//   .finally ( () => {
//     console.log('done');
//   });
  


  //SHOW LIST OF CARDS FROM SERVER
//GET USER INFO and CARDS from SERVER using Promise.all

Promise.all([api.getUserInfo(), api.getCardList()])
.then(([userData, cardsFromServer]) => {
  // debugger
  console.log('userData=', userData);
  console.log('userData.name=', userData.name);
  console.log('userData.about=', userData.about);
  console.log('userData.avatar=', userData.avatar);
  console.log('userData._id=', userData._id);
  userInfo.setUserInfo(
    userData.name,
    userData.about,
    userData.avatar,
    userData._id
    );

    cardsSection = new Section(
      {
        data : cardsFromServer,
        renderer : renderCard,
        // renderer : renderCard(data, myOwnerId),
        // renderer : renderCard(userData, myOwnerId),

      },
      selectors.cardSection
      );
      cardsSection.renderItems(cardsFromServer);
    })
    .catch((err) => {
      console.log(err)
      console.log('done2')
    });

const newCardPopup = new PopupWithImage(selectors.previewPopup);

// const renderCard = (data, userData) => {
  const renderCard = (data) => {
  console.log('datax=',data);
  // console.log('cardOwnerId=', data.owner._id);
  // const renderCard = (data, myOwnerId) => {
    // const renderCard = (data, userId) => {
  const cardElement = new Card(
    {
      data,
      handleZoom: () => {
        newCardPopup.open(data);
      },
    },
    selectors.cardTemplate,
    api,
    // userData,
    // userData._id,
    // this._userId,
    userInfo._userId,
  {handleCan: function()   {
      // const confirmDeletePopup = new PopupWithForm({
      // popupSelector:selectors.confirmPopup,
      //   handleFormSubmit: () => {
      //     //code 10 review 2
      //     // this._api.removeCard(this._id)
      //     cardElement._api.removeCard(cardElement._id)
      //       .then(res=> {
      //         confirmDeletePopup.close();
      //         //code 11
      //         // this._element.remove();
      //         cardElement._element.remove();
      //       })
      //       .catch( (err) => {
      //         console.log('error=getCardList', err);
      //       })
      //     }
      //   })
        // confirmDeletePopup.open(this._btn);.
        //code 12
        // confirmDeletePopup.setEventListeners();
        confirmDeletePopup._currentCardElement = cardElement;
        confirmDeletePopup.open(cardElement);
        // confirmDeletePopup.open(cardElement._btn);
        // confirmDeletePopup.open;
      }
    },
   {handleHeart:function(event) {
        const cardGridLikes = cardElement._element.querySelector(".card-grid__likes");
        console.log('event=', event);
        if(event.target.classList.length === 1) {
          // this._api.addLike(this._id)
          //code15
          cardElement._api.addLike(cardElement._id)
            .then(res=> {
              //code 14 consider an 'if' to check if res is good or not
              // console.log('res=', res);
              // console.log('res.ok=', res.ok);
              // console.log('res.status=', res.status);
              if ( (res.ok === true) && (res.status === 200) ) {
                event.target.classList.add("card-grid__icon_active");
                cardElement._likes.length = cardElement._likes.length + 1;
              };
              // this._likes.length = this._likes.length + 1;
              cardGridLikes.textContent = this._likes.length
            })
            .catch((err) => {
              console.log('error=', err);
            })
            // // .finally( () => {
            //   // cardElement._likes.length = cardElement._likes.length + 1;
            //   cardGridLikes.textContent = this._likes.length
            // // })
        } else{

          // cardElement._likes.length = cardElement._likes.length - 1;
          //code 17
          // this._api.removeLike(this._id)
          cardElement._api.removeLike(cardElement._id)
          .then(res=> {
            console.log('res=', res);
            console.log('res.ok=', res.ok);
            console.log('res.status=', res.status);
            if ( (res.ok === true) && (res.status === 200) ) {
              event.target.classList.remove("card-grid__icon_active");
              cardElement._likes.length = cardElement._likes.length - 1;
            };
            // this._likes.length = this._likes.length - 1;
              cardGridLikes.textContent = cardElement._likes.length;
            })
            .catch( (err) => {
              console.log('error=', err);
            })
            // .finally( () => {
            //   cardGridLikes.textContent = cardElement._likes.length;
            // })
        }
    }
  }
  )

  //888888888888888888888888888888888888888888888



  //8888888888888888888888888888888888888888888888
  // let cardsSection;
// console.log('cardsSection=', cardsSection);
// console.log('items=', _items);
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
  
  // NOTE....line 234 results in only allowing one card to be added
  newPlacePopup.setEventListeners();

  const editProfilePopup = new PopupWithForm( {
    popupSelector: selectors.profilePopup,
    handleFormSubmit: (newUserData) => {
      btnEditProfileSave.innerText = "Saving"
      //code 20 review 2
      // userInfo.setUserInfo(newUserData.name, newUserData.about)
      const name = newUserData.name;
      const about = newUserData.about;
      const avatar = newUserData.avatar;
      api.addUserInfo( {name, about} )
      .then(res => {
        // userInfo.setUserInfo(newUserData.name, newUserData.about)
        editProfilePopup.close();
      })
      .catch( (err) => {
        console.log(err)
      })
      .finally( () => {
        userInfo.setUserInfo(newUserData.name, newUserData.about)
        btnEditProfileSave.innerText = "Save"
      })
    }
  })
  // NOTE....line 260 results in only allowing one card to be added
  editProfilePopup.setEventListeners();

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
  editAvatarPopup.setEventListeners();

function renderAvatar( {avatarLink} ) {
  // const avatarNew = document.getElementById("introImage");
  userInfo._avatarElement.src = avatarLink;
}

function fillProfileForm() {
    const userData = userInfo.getUserInfo();
    popupEditProfileName.value = userData.userName;
    popupEditProfileAbout.value = userData.userJob;
}   


//EVENT LISTENERS -----------------------


//EVENT LISTENER - listen for "X" and listen for remote click

// const popup = new Popup(popupSelector);
// const popup = new Popup(selectors);
// const popup = new Popup( {selectors} );
// popup.setEventListeners();

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
  //code 22
  // btnEditAvatarSave.innerText = "Save"
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



