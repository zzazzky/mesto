const hasInvalidInput = (inputList) => {
  return inputList.some((inpitElement) => !inpitElement.validity.valid);
}

const toggleButtonState = (validationConfig, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}
const hideInputError = (validationConfig, inputElement, errorElement) => {
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
}

const showInputError = (validationConfig, inputElement, errorElement, errorMessage) => {
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = errorMessage;
}

const checkInputValidity = (validationConfig, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.name}`)
  if (inputElement.validity.valid) {
    hideInputError(validationConfig, inputElement, errorElement);
  } else {
    showInputError(validationConfig, inputElement, errorElement, inputElement.validationMessage);
  }
}

const setEventListener = (validationConfig, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  
  toggleButtonState(validationConfig, inputList, buttonElement);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(validationConfig, formElement, inputElement);
      toggleButtonState(validationConfig, inputList, buttonElement);
    });
  })

  //слушатель перенесен в эту функцию для того, чтобы при сабмите передать ему локальную функцию проверки активности кнопки 
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    toggleButtonState(validationConfig, inputList, buttonElement);
  });
}

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => setEventListener(validationConfig, formElement));
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});