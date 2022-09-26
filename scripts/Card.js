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

  _handleImageClick() {
    bigImage.src = this.cardImage.src;
    bigImage.alt = this.cardImage.alt;
    bigCaption.textContent = this.cardText.textContent;

    openPopup(popupImage);
  }

  _handleLikeClick() {
    this.cardLike.classList.toggle("place__like_active");
  }

  _handleDeleteClick() {
    this.cardPlace.remove();
  }

  _setEventListeners() {
    this.cardImage.addEventListener("click", () => this._handleImageClick());
    this.cardLike.addEventListener("click", () => this._handleLikeClick());
    this.cardDelete.addEventListener("click", () => this._handleDeleteClick());
  }

  createCard() {
    this.cardPlace = this._getTemplate();

    this.cardLike = this.cardPlace.querySelector(".place__like");
    this.cardDelete = this.cardPlace.querySelector(".place__delete");
    this.cardImage = this.cardPlace.querySelector(".place__image");
    this.cardText = this.cardPlace.querySelector(".place__text");

    this.cardImage.src = this._link;
    this.cardImage.alt = this._name;
    this.cardText.textContent = this._name;

    this._setEventListeners();

    return this.cardPlace;
  }
}
