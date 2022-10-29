import Popup from "./Popup.js";

export default class PopupWithButton extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._buttonConfirm = this._popup.querySelector(".popup__button");
  }

  setEventListeners() { 

    super.setEventListeners(); 
    this._buttonConfirm.addEventListener("click", evt => { 
      evt.preventDefault(); 
      this._handleConfirm(this._cardId, this._card); 
    }); 

  } 
  open(cardId, card) {
    super.open();
    this._cardId = cardId;
    this._card = card;
  }
}
