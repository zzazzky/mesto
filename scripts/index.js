import { cardsList } from "./cardsList.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Section from "./Section.js";

export const userInfo = new UserInfo(".profile__name", ".profile__description");

export const popupImage = new PopupWithImage(".popup_type_picture");

const popupEditProfile = new PopupWithForm(".popup_type_edit-profile", () => {
  popupEditProfile._getInputValues();
  userInfo.setUserInfo(
    popupEditProfile.inputValues["profile-name"],
    popupEditProfile.inputValues["profile-description"]
  );

  popupEditProfile.close();
});

const popupAddCard = new PopupWithForm(".popup_type_add-card", () => {
  popupAddCard._getInputValues();
  const cardElement = new Section(
    {
      items: [popupAddCard.inputValues],
      renderer: cardData => {
        const card = new Card(cardData, ".places__template", () => {
          popupImage.open(card._name, card._link);
        });
        return card.createCard();
      },
    },
    ".places__list"
  );
  cardElement.renderItems();
  cardElement.elements.forEach(item => cardElementsList.addItem(item));

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

const cardElementsList = new Section(
  {
    items: cardsList,
    renderer: cardData => {
      const card = new Card(cardData, ".places__template", () => {
        popupImage.open(card._name, card._link);
      });
      return card.createCard();
    },
  },
  ".places__list"
);

cardElementsList.renderItems();
cardElementsList.elements.forEach(item => cardElementsList.addItem(item));

buttonEditProfile.addEventListener("click", () => popupEditProfile.open());
buttonAddCard.addEventListener("click", () => {
  popupAddCard.open();
});

formList.forEach(formElement => {
  const validator = new FormValidator(validationConfig, formElement);

  const formName = formElement.getAttribute("name");

  FormValidators[formName] = validator;

  validator.enableValidation();
});
