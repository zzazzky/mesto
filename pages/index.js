//открытие попапа
let editButton = document.querySelector('.profile .profile__edit-button');
let popup = document.querySelector('.popup')
editButton.addEventListener('click', openPopup);

function openPopup() {
  popup.classList.add('popup_opened');
}

//редактирование профайла
let formElement = document.querySelector('.popup__container');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__description');

formElement.addEventListener('submit', formSubmitHandler);

//добавила, поскольку через submit не сохраняет изменения по нажатию кнопки Enter
nameInput.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 13) {
    formSubmitHandler(evt);
  }
});

//добавила, поскольку через submit не сохраняет изменения по нажатию кнопки Enter
jobInput.addEventListener('keydown', function(evt) {
  if (evt.keyCode === 13) {
    formSubmitHandler(evt);
  }
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  popup.classList.remove('popup_opened');
  profileName.textContent =`${nameInput.value}`;
  profileDescription.textContent = `${jobInput.value}`;
}

//закрытие попапа без сохранения
let closeButton = document.querySelector('.poup__close-button');

closeButton.addEventListener('click', closePopup);

function closePopup(evt) {
  evt.preventDefault();
  popup.classList.remove('popup_opened');
}