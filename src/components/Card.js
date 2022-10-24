export default class Card {
  constructor(cardData, templateSelector, handleCardClick, handleDeleteClick) {
    this.link = cardData["link"];
    this.name = cardData["name"];
    /*this._id = cardData["_id"];
    this.likes = cardData["likes"];
    this._ownerId = cardData.owner._id;*/
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".place")
      .cloneNode(true);

    return cardTemplate;
  }
  _handleLikeClick() {
    this._cardLike.classList.toggle("place__like-button_active");
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

    this._cardLike = this.cardPlace.querySelector(".place__like-button");
    this._cardDelete = this.cardPlace.querySelector(".place__delete");
    this._cardImage = this.cardPlace.querySelector(".place__image");
    this._cardText = this.cardPlace.querySelector(".place__text");

    this._cardImage.src = this.link;
    this._cardImage.alt = this.name;
    this._cardText.textContent = this.name;

    this._setEventListeners();

    return this.cardPlace;
  }
}
