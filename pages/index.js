//открытие попапа
let editButton = document.querySelector('.profile .profile__edit-button');
let popup = document.querySelector('.popup')
let closeButton = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let nameInput = document.querySelector('.popup__input-box_content_name');
let jobInput = document.querySelector('.popup__input-box_content_description');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  popup.classList.remove('popup_opened');
  profileName.textContent =`${nameInput.value}`;
  profileDescription.textContent = `${jobInput.value}`;
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);


