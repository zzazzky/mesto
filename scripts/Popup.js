export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector(".popup__close-button");
  }

  _removeHandlerEscKeydown() {
    document.removeEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._removeHandlerEscKeydown();
  }

  _handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  _handleEscClose = evt => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    this._buttonClose.addEventListener("click", () => this.close());
    this._popup.addEventListener("click", evt => this._handleOverlayClick(evt));
  }

  open() {
    this._popup.classList.add("popup_opened");

    this._setEventListeners();
  }
}
