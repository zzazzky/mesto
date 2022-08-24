const placesContainer = document.querySelector('.places__list');

//Кнопка закрытия попапов

function closeForm(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}

//Кнопка лайка

function switchLike (evt) {
  evt.target.classList.toggle('place__like_active');
}

function listenLikeClick (element) {
  element.addEventListener('click', switchLike);
}

//Кнопка удаления

function deleteCard(evt) {
  const deletedCard = evt.target.closest('.place');
  deletedCard.remove();
}

function listenDeleteClick(element) {
  element.addEventListener('click', deleteCard);
}

//Открытие картинки

const imagePopup = document.querySelector('.popup_type_picture');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close-button');

function openImage(evt) {
  const promoImage = evt.target;
  const bigImage = imagePopup.querySelector('.popup__image');
  const promoCaption = evt.target.closest('.place').querySelector('.place__text');
  const bigCaption = imagePopup.querySelector('.popup__caption');

  imagePopup.classList.add('popup_opened');
  bigImage.src = promoImage.src;
  bigCaption.textContent = promoCaption.textContent;
}

function listenImageClick(element) {
  element.addEventListener('click', openImage);
}

//Закрытие попапа с картинкой

imagePopupCloseButton.addEventListener('click', closeForm);

//Обработчик формы edit-profile

const editButton = document.querySelector('.profile__edit-button');
const editForm = document.querySelector('.popup_type_edit-profile');
const closeEditFormButton = editForm.querySelector('.popup__close-button');
const editFormElement = editForm.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = editForm.querySelector('.popup__input-box_content_name');
const jobInput = editForm.querySelector('.popup__input-box_content_description');

function openEditForm() {
  editForm.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  editForm.classList.remove('popup_opened');
  profileName.textContent =`${nameInput.value}`;
  profileDescription.textContent = `${jobInput.value}`;
}

editButton.addEventListener('click', openEditForm);
closeEditFormButton.addEventListener('click', closeForm);
editFormElement.addEventListener('submit', editFormSubmitHandler);

//Открытие и закрытие формы добавления карточек

const addButton = document.querySelector('.profile__add-button');
const addForm = document.querySelector('.popup_type_add-card');
const closeAddFormButton = addForm.querySelector('.popup__close-button');

function openAddForm() {
  addForm.classList.add('popup_opened');
}

addButton.addEventListener('click', openAddForm);
closeAddFormButton.addEventListener('click', closeForm);

//Добавление карточек по дефолту

const initialCards = [
  {
    name: 'Балтийское море',
    link: './images/place__balt-more.jpg',
  },
  {
    name: 'Домбай',
    link: './images/place__dombay.jpg',
  },
  {
    name: 'Эльбрус',
    link: './images/place__elbrus.jpg',
  },
  {
    name: 'Камчатский край',
    link: './images/place__kamchatka.jpg',
  },
  {
    name: 'Карачаево-Черкессия',
    link: './images/place__karachevsk.jpg',
  },
  {
    name: 'Сахалин',
    link: './images/place__sachalin.jpg',
  },
];

function addCard(element) {
  const cardTemplate = document.querySelector('.places__template').content;
  const cardPlace =  cardTemplate.querySelector('.place').cloneNode(true);
  const cardImage = cardPlace.querySelector('.place__image');
  const cardText = cardPlace.querySelector('.place__text');
  const cardLike = cardPlace.querySelector('.place__like');
  const cardDelete = cardPlace.querySelector('.place__delete');

  cardImage.src = element.link;
  cardText.textContent = element.name;

  placesContainer.prepend(cardPlace);
  listenLikeClick(cardLike);
  listenDeleteClick(cardDelete);
  listenImageClick(cardImage);
}

initialCards.forEach(addCard);

//Добавление карточки пользователем

const placeNameInput = addForm.querySelector('.popup__input-box_content_place-name');
const placeLinkInput = addForm.querySelector('.popup__input-box_content_place-link');

function addNewCard(evt) {
  evt.preventDefault();
  addForm.classList.remove('popup_opened');

  initialCards.unshift({name: `${placeNameInput.value}`, link: `${placeLinkInput.value}`});

  addCard(initialCards[0]);
}

addForm.addEventListener('submit', addNewCard);