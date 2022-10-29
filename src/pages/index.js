import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import PopupWithButton from "../components/PopupWithButton.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-52",
  headers: {
    authorization: "f244abf0-7dcd-442d-a985-b4b4e092fdb8",
    "Content-Type": "application/json",
  },
});

const cardContainer = new Section(
    (cardData) => {
    const cardElement = createCard(cardData);
    cardContainer.addItem(cardElement);
  },
  ".places__list"
);

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__avatar",
});

function initialRender() {
  Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cardContainer.renderItems(cards);
  })
  .catch(err => console.log(err)); 
}

const popupImage = new PopupWithImage(".popup_type_picture");

const popupEditProfile = new PopupWithForm(
  ".popup_type_edit-profile",
  inputValues => {
    api.editProfile({
        name: inputValues["profile-name"],
        about: inputValues["profile-description"],
      })
      .then((res) => userInfo.setProfileDescription(res))
      .then(() => popupEditProfile.close())
      .catch(err => console.log(err))
      .finally(() => popupEditProfile.switchButtonText());
  }
);

const popupAddCard = new PopupWithForm(".popup_type_add-card", inputValues => {
  api.addCard(inputValues)
    .then(res => createCard(res))
    .then(res => cardContainer.addItem(res))
    .then(() => popupAddCard.close())
    .catch(err => console.log(err))
    .finally(() => popupAddCard.switchButtonText());
});

const popupEditAvatar = new PopupWithForm(
  ".popup_type_edit-avatar",
  inputValues => {
    api.editAvatar(inputValues["avatar-link"])
      .then((res) => userInfo.setAvatar(res.avatar))
      .then(() => popupEditAvatar.close())
      .catch(err => console.log(err))
      .finally(() => popupEditAvatar.switchButtonText());
  }
);

const popupDeleteCard = new PopupWithButton(
  ".popup_type_delete-card",
  (cardId, card) => {
    api.deleteCard(cardId)
      .then(() => card.deleteCard())
      .then(() => popupDeleteCard.close())
      .catch(err => console.log(err)); 
  }
);

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
const buttonEditAvatar = document.querySelector(".profile__avatar-edit-button");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const formList = Array.from(
  document.querySelectorAll(validationConfig.formSelector)
);

const formValidators = {};

const createCard = function (cardData) {
  const card = new Card(
    cardData,
    ".places__template",
    () => {
      popupImage.open(card.name, card.link);
    },
    () => {
      popupDeleteCard.open(card.id, card);
    },
    (cardId, card) => {
      api.setCardLike(cardId)
        .then(res => {
          card.renewLikesCounter(res.likes);
        })
        .then(() => card.toggleLike())
        .catch(err => console.log(err)); 
    },
    (cardId, card) => {
      api.removeCardLike(cardId)
        .then(res => {
          card.renewLikesCounter(res.likes);
        })
        .then(() => card.toggleLike())
        .catch(err => console.log(err)); 
    },
    () => {
      if (card.ownerId === userInfo.id) {
        return true;
      } else {
        return false;
      }
    },
    () => {
      if (card.likes.some(likeData => likeData._id === userInfo.id)) {
        return true;
      } else {
        return false;
      }
    }
  );

  const cardElement = card.createCard();
  return cardElement;
};

const nameInput = document.querySelector(".popup__input_content_profile-name");
const jobInput = document.querySelector(".popup__input_content_description");

initialRender();

popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
popupImage.setEventListeners();
popupEditAvatar.setEventListeners();
popupDeleteCard.setEventListeners();

buttonEditProfile.addEventListener("click", () => {
  const profileData = userInfo.getUserInfo();
  nameInput.value = profileData.name;
  jobInput.value = profileData.job;
  formValidators[popupEditProfile.form.getAttribute("name")].resetValidation();
  popupEditProfile.open();
});

buttonAddCard.addEventListener("click", () => {
  formValidators[popupAddCard.form.getAttribute("name")].resetValidation();
  popupAddCard.open();
});

buttonEditAvatar.addEventListener("click", () => {
  formValidators[popupEditAvatar.form.getAttribute("name")].resetValidation();
  popupEditAvatar.open();
});


formList.forEach(formElement => {
  const validator = new FormValidator(validationConfig, formElement);

  const formName = formElement.getAttribute("name");

  formValidators[formName] = validator;

  validator.enableValidation();
});
