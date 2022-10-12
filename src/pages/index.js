import "./index.css";
import { cardsList } from "../components/cardsList.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";

export const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
});

const cardContainer = new Section(
  {
    items: cardsList,
    renderer: cardData => {
      const cardElement = createCard(cardData);
      cardContainer.addItem(cardElement);
    },
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

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");

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

export const FormValidators = {};

const createCard = function (cardData) {
  const card = new Card(cardData, ".places__template", () => {
    popupImage.open(card.name, card.link);
  });
  const cardElement = card.createCard();
  return cardElement;
};

popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
popupImage.setEventListeners();

cardContainer.renderItems();

buttonEditProfile.addEventListener("click", () => {
  userInfo.getUserInfo();
  popupEditProfile.inputList[0].value = userInfo.profileDate.name;
  popupEditProfile.inputList[1].value = userInfo.profileDate.job;
  FormValidators[popupEditProfile.form.getAttribute("name")].resetValidation();
  popupEditProfile.open();
});

buttonAddCard.addEventListener("click", () => {
  FormValidators[popupAddCard.form.getAttribute("name")].resetValidation();
  popupAddCard.open();
});

formList.forEach(formElement => {
  const validator = new FormValidator(validationConfig, formElement);

  const formName = formElement.getAttribute("name");

  FormValidators[formName] = validator;

  validator.enableValidation();
});
