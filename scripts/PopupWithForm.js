import Popup from "./Popup.js";
import { FormValidators } from "./index.js";
import { userInfo } from "./index.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = Array.from(this._form.querySelectorAll(".popup__input"));
  }

  _getInputValues() {
    this.inputValues = {};
    this._inputList.forEach(input => {
      const key = input.name;
      const value = input.value;

      this.inputValues[key] = value;
    });
  }

  _setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    this._buttonClose.addEventListener("click", () => this.close());
    this._form.addEventListener("submit", () => this._handleSubmit());
    this._popup.addEventListener("click", evt => this._handleOverlayClick(evt));
  }

  open() {
    if (this._popup.classList.contains("popup_type_edit-profile")) {
      userInfo.getUserInfo();
      this._inputList[0].value = userInfo.profileDate.name;
      this._inputList[1].value = userInfo.profileDate.job;
    }

    FormValidators[this._form.getAttribute("name")].resetValidation();
    this._popup.classList.add("popup_opened");
    this._setEventListeners();
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._removeHandlerEscKeydown();
    FormValidators[this._form.getAttribute("name")].cleanInputs();
  }
}
