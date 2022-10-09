export default class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._link = cardData["place-link"];
    this._name = cardData["place-name"];
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".place")
      .cloneNode(true);

    return cardTemplate;
  }
  _handleLikeClick() {
    this._cardLike.classList.toggle("place__like_active");
  }

  _handleDeleteClick() {
    this.cardPlace.remove();
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });
    this._cardLike.addEventListener("click", () => this._handleLikeClick());
    this._cardDelete.addEventListener("click", () => this._handleDeleteClick());
  }

  createCard() {
    this.cardPlace = this._getTemplate();

    this._cardLike = this.cardPlace.querySelector(".place__like");
    this._cardDelete = this.cardPlace.querySelector(".place__delete");
    this._cardImage = this.cardPlace.querySelector(".place__image");
    this._cardText = this.cardPlace.querySelector(".place__text");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardText.textContent = this._name;

    this._setEventListeners();

    return this.cardPlace;
  }
}
