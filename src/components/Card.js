export default class Card {
  constructor(
    cardData,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    setLikeClick,
    removeLikeClick,
    checkOwnerId,
    checkIsLiked
  ) {
    this.link = cardData["link"];
    this.name = cardData["name"];
    this.id = cardData["_id"];
    this.likes = cardData["likes"];
    this.ownerId = cardData.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._setLikeClick = setLikeClick;
    this._removeLikeClick = removeLikeClick;
    this._checkOwnerId = checkOwnerId;
    this._checkIsLiked = checkIsLiked;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector(".place")
      .cloneNode(true);

    return cardTemplate;
  }

  _handleLikeClick() {
    if (this._checkIsLiked()) {
      this._removeLikeClick(this.id, this);
    } else {
      this._setLikeClick(this.id, this);
    }
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });
    this._cardLike.addEventListener("click", () => this._handleLikeClick());
    if (this._cardDelete) {
      this._cardDelete.addEventListener("click", () =>
        this._handleDeleteClick()
      );
    }
  }

  createCard() {
    this.cardPlace = this._getTemplate();

    this._cardLike = this.cardPlace.querySelector(".place__like-button");
    this._cardDelete = this.cardPlace.querySelector(".place__delete");
    this._cardImage = this.cardPlace.querySelector(".place__image");
    this._cardText = this.cardPlace.querySelector(".place__text");
    this._likeCounter = this.cardPlace.querySelector(".place__like-number");
    if (!this._checkOwnerId()) {
      this._cardDelete.remove();
    }
    if (this._checkIsLiked()) {
      this.toggleLike();
    }
    this._cardImage.src = this.link;
    this._cardImage.alt = this.name;
    this._cardText.textContent = this.name;
    this._likeCounter.textContent = this.likes.length;
    this._setEventListeners();

    return this.cardPlace;
  }

  toggleLike() {
    this._cardLike.classList.toggle("place__like-button_active");
  }

  renewLikesCounter(newLikesArray) {
    this.likes = newLikesArray;
    this._likeCounter.textContent = this.likes.length;
  }

  deleteCard() {
    this.cardPlace.remove();
    this.cardPlace = null;
  }
}
