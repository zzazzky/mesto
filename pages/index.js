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

function closeEditForm() {
  editForm.classList.remove('popup_opened');
}

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  editForm.classList.remove('popup_opened');
  profileName.textContent =`${nameInput.value}`;
  profileDescription.textContent = `${jobInput.value}`;
}

editButton.addEventListener('click', openEditForm);
closeEditFormButton.addEventListener('click', closeEditForm);
editFormElement.addEventListener('submit', editFormSubmitHandler);

//Открытие и закрытие формы добавления карточек
const addButton = document.querySelector('.profile__add-button');
const addForm = document.querySelector('.popup_type_add-card');
const closeAddFormButton = addForm.querySelector('.popup__close-button');

function openAddForm() {
  addForm.classList.add('popup_opened');
}

function closeAddForm() {
  addForm.classList.remove('popup_opened');
}

addButton.addEventListener('click', openAddForm);
closeAddFormButton.addEventListener('click', closeAddForm);

//Добавление карточки пользователем
const placesContainer = document.querySelector('.places__list');
const placeNameInput = addForm.querySelector('.popup__input-box_content_place-name');
const placeLinkInput = addForm.querySelector('.popup__input-box_content_place-link');

function addNewCard(evt) {
  evt.preventDefault();
  addForm.classList.remove('popup_opened');

  const cardTemplate = document.querySelector('.places__template').content;
  const cardPlace =  cardTemplate.querySelector('.place').cloneNode(true);
  const cardImage = cardPlace.querySelector('.place__image');
  const cardText = cardPlace.querySelector('.place__text');
  const cardLike = cardPlace.querySelector('.place__like');
  const cardDelete = cardPlace.querySelector('.place__delete');
  cardImage.src = placeLinkInput.value;
  cardText.textContent = placeNameInput.value;

  placesContainer.prepend(cardPlace);
  listenLikeClick(cardLike);
  listenDeleteClick(cardDelete);
}

addForm.addEventListener('submit', addNewCard);

//Добавление карточек по дефолту
const initialCards = [
  {
    name: 'Балтийское море',
    link: './images/place__balt-more.jpg',
    description: 'Фотография Балтийского моря'
  },
  {
    name: 'Домбай',
    link: './images/place__dombay.jpg',
    description: 'Фотография горы Домбай'
  },
  {
    name: 'Эльбрус',
    link: './images/place__elbrus.jpg',
    description: 'Фотография горы Эльбрус'
  },
  {
    name: 'Камчатский край',
    link: './images/place__kamchatka.jpg',
    description: 'Фотография вулканов на Камчатке'
  },
  {
    name: 'Карачаево-Черкессия',
    link: './images/place__karachevsk.jpg',
    description: 'Фотография замка в городе Карачаевск'
  },
  {
    name: 'Сахалин',
    link: './images/place__sachalin.jpg',
    description: 'Фотография природы на острове Сахалин'
  },
];

function addCard(element) {
  const cardTemplate = document.querySelector('.places__template').content;
  const cardPlace =  cardTemplate.querySelector('.place').cloneNode(true);
  const cardImage = cardPlace.querySelector('.place__image');
  const cardText = cardPlace.querySelector('.place__text');

  cardImage.src = element.link;
  cardText.textContent = element.name;

  placesContainer.prepend(cardPlace);
}

initialCards.forEach(addCard);

//кнопка лайка

const likeButtons = placesContainer.querySelectorAll('.place__like');
const likeButtonsArray = Array.from(likeButtons);

function switchLike (evt) {
  evt.target.classList.toggle('place__like_active');
}

function listenLikeClick (element) {
  element.addEventListener('click', switchLike);
}

likeButtonsArray.forEach(listenLikeClick);

//кнопка удаления

const deleteButtons = placesContainer.querySelectorAll('.place__delete');
const deleteButtonsArray = Array.from(deleteButtons);

function deleteCard(evt) {
  const deletedCard = evt.target.closest('.place');
  deletedCard.remove();
}

function listenDeleteClick(element) {
element.addEventListener('click', deleteCard);
}

deleteButtons.forEach(listenDeleteClick);