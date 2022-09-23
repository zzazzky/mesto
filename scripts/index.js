import { cardsList } from "./cardsList.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const placesContainer = document.querySelector(".places__list");

const popupImage = document.querySelector(".popup_type_picture");
const buttonClosePopupImage = popupImage.querySelector(".popup__close-button");
const bigImage = popupImage.querySelector(".popup__image");
const bigCaption = popupImage.querySelector(".popup__caption");

const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const buttonCloseEditPopup = popupEditProfile.querySelector(
  ".popup__close-button"
);
const formEditProfile = popupEditProfile.querySelector(".popup__form");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const nameInput = popupEditProfile.querySelector(".popup__input_content_name");
const jobInput = popupEditProfile.querySelector(
  ".popup__input_content_description"
);

const buttonAddCard = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_add-card");
const formAddCard = popupAddCard.querySelector(".popup__form");
const buttonCloseAddForm = popupAddCard.querySelector(".popup__close-button");
const placeNameInput = popupAddCard.querySelector(
  ".popup__input_content_place-name"
);
const placeLinkInput = popupAddCard.querySelector(
  ".popup__input_content_place-link"
);

function removeHandlerEscKeydown() {
  document.removeEventListener("keydown", handleEscKeydown);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  removeHandlerEscKeydown();
}

function handleOverlayClick(evt, popup) {
  if (evt.target === evt.currentTarget) {
    closePopup(popup);
  }
}
function handleEscKeydown(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

function setPopupListeners() {
  document.addEventListener("keydown", handleEscKeydown);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  setPopupListeners();
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function renderCard(cardData) {
  const card = new Card(cardData, ".places__template").createCard();
  placesContainer.prepend(card);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const cardNew = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };

  renderCard(cardNew);
  closePopup(popupAddCard);
  formAddCard.reset();
}

nameInput.value = profileName.textContent;
jobInput.value = profileDescription.textContent;

export { bigImage, bigCaption, openPopup, popupImage };

buttonEditProfile.addEventListener("click", function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

popupAddCard.addEventListener("click", (evt) =>
  handleOverlayClick(evt, popupAddCard)
);
popupEditProfile.addEventListener("click", (evt) =>
  handleOverlayClick(evt, popupEditProfile)
);
popupImage.addEventListener("click", (evt) =>
  handleOverlayClick(evt, popupImage)
);

buttonCloseEditPopup.addEventListener("click", () =>
  closePopup(popupEditProfile)
);
formEditProfile.addEventListener("submit", handleEditFormSubmit);

buttonClosePopupImage.addEventListener("click", () => closePopup(popupImage));

buttonAddCard.addEventListener("click", () => openPopup(popupAddCard));
buttonCloseAddForm.addEventListener("click", () => closePopup(popupAddCard));
formAddCard.addEventListener("submit", handleAddFormSubmit);

cardsList.forEach((cardData) => renderCard(cardData));

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

formList.forEach((formElement) => {
  const validator = new FormValidator(validationConfig, formElement);
  validator.enableValidation();
});
