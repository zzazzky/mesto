import { bigImage, bigCaption, openPopup, popupImage } from "./index.js";

export default class Card {
  constructor(cardData, templateSelector) {
    this._link = cardData.link;
    this._name = cardData.name;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".place")
      .cloneNode(true);

    return cardTemplate;
  }

  _handleImageClick(cardImage, cardText) {
    bigImage.src = cardImage.src;
    bigImage.alt = cardImage.alt;
    bigCaption.textContent = cardText.textContent;

    openPopup(popupImage);
  }

  _handleLikeClick(buttonLike) {
    buttonLike.classList.toggle("place__like_active");
  }

  _handleDeleteClick() {
    this.cardPlace.remove();
  }

  _setEventListeners(cardImage, cardLike, cardDelete, cardText) {
    cardImage.addEventListener("click", () =>
      this._handleImageClick(cardImage, cardText)
    );
    cardLike.addEventListener("click", () => this._handleLikeClick(cardLike));
    cardDelete.addEventListener("click", () => this._handleDeleteClick());
  }

  createCard() {
    this.cardPlace = this._getTemplate();

    const cardLike = this.cardPlace.querySelector(".place__like");
    const cardDelete = this.cardPlace.querySelector(".place__delete");
    const cardImage = this.cardPlace.querySelector(".place__image");
    const cardText = this.cardPlace.querySelector(".place__text");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardText.textContent = this._name;

    this._setEventListeners(cardImage, cardLike, cardDelete, cardText);

    return this.cardPlace;
  }
}
