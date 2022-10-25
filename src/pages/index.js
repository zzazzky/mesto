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

export const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__avatar",
});

function fillUserInfo() {
  api.getUserInfo().then(res => userInfo.setUserInfo(res));
}

const cardContainer = new Section(
  api.getInitialCards().then(function (res) {
    return res;
  }),
  cardData => {
    const cardElement = createCard(cardData);
    cardContainer.addItem(cardElement);
  },
  ".places__list"
);

export const popupImage = new PopupWithImage(".popup_type_picture");

const popupEditProfile = new PopupWithForm(
  ".popup_type_edit-profile",
  inputValues => {
    userInfo.setUserInfo(
      inputValues["profile-name"],
      inputValues["profile-description"]
    );

    popupEditProfile.close();
  }
);

const popupAddCard = new PopupWithForm(".popup_type_add-card", inputValues => {
  const cardElement = createCard(inputValues);
  cardContainer.addItem(cardElement);
  popupAddCard.close();
});

const popupEditAvatar = new PopupWithForm(
  ".popup_type_edit-avatar",
  inputValues => {
    avatar.src = inputValues["avatar-link"];
    popupEditAvatar.close();
  }
);

const popupDeleteCard = new PopupWithButton(".popup_type_delete-card", card => {
  card.remove();
  card = null;
});

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
      popupDeleteCard.open(card.cardPlace);
    },
    () => {
      if (card.ownerId === userInfo.id) {
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

popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
popupImage.setEventListeners();
popupEditAvatar.setEventListeners();
popupDeleteCard.setEventListeners();
cardContainer.renderItems();

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

fillUserInfo();

formList.forEach(formElement => {
  const validator = new FormValidator(validationConfig, formElement);

  const formName = formElement.getAttribute("name");

  formValidators[formName] = validator;

  validator.enableValidation();
});
