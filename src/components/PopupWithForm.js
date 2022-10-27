import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this.form = this._popup.querySelector(".popup__form");
    this.inputList = Array.from(this.form.querySelectorAll(".popup__input"));
    this._button = this._popup.querySelector(".popup__button");
  }

  _getInputValues() {
    const inputValues = {};
    this.inputList.forEach(input => {
      const key = input.name;
      const value = input.value;

      inputValues[key] = value;
    });

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", evt => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._button.textContent = "Сохранение...";
      this._handleSubmit(inputValues);
    });
  }

  close() {
    super.close();
    this.form.reset();
  }

  switchButtonText() {
    this._button.textContent = "Сохранить";
  }
}
