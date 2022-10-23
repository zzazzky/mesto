import Popup from "./Popup.js";

export default class PopupWithButton extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._buttonConfirm = this._popup.querySelector(".popup__button");
  }

  _handleEnterClose = evt => {
    if (evt.key === "Enter") {
      this._handleConfirm;
      this.close();
    }
  };

  setEventListeners() {
    super.setEventListeners();
    this._buttonConfirm.addEventListener("click", evt => {
      evt.preventDefault();
      this._handleConfirm(this._card);
      this.close();
    });
  }

  open(card) {
    super.open();
    document.addEventListener("keydown", this._handleEnterClose);
    this._card = card;
  }

  close() {
    super.close();
  }
}
