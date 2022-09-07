const cards = [
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

const placesContainer = document.querySelector('.places__list');

const popupImage = document.querySelector('.popup_type_picture');
const buttonClosePopupImage = popupImage.querySelector('.popup__close-button');
const bigImage = popupImage.querySelector('.popup__image');
const bigCaption = popupImage.querySelector('.popup__caption');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const buttonCloseEditPopup = popupEditProfile.querySelector('.popup__close-button');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = popupEditProfile.querySelector('.popup__input_content_name');
const jobInput = popupEditProfile.querySelector('.popup__input_content_description');

const buttonAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
const formAddCard = popupAddCard.querySelector('.popup__form');
const buttonCloseAddForm = popupAddCard.querySelector('.popup__close-button');
const placeNameInput = popupAddCard.querySelector('.popup__input_content_place-name');
const placeLinkInput = popupAddCard.querySelector('.popup__input_content_place-link');

const cardTemplate = document.querySelector('.places__template').content;
const cardTemplateContent = cardTemplate.querySelector('.place');

function removeHandler() {
  document.removeEventListener('keydown', handleEscKeydown);
}

function closePopup() {
  document.querySelector('.popup_opened').classList.remove('popup_opened');
  removeHandler();
}

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup();
  }
}
function handleEscKeydown(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

function setPopupListeners (popup) {
  document.addEventListener('keydown', handleEscKeydown);
  popup.addEventListener('click', handleOverlayClick);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  setPopupListeners (popup);
}

function handleImageClick(cardImage, cardText) {
  bigImage.src = cardImage.src;
  bigImage.alt = cardImage.alt;
  bigCaption.textContent = cardText.textContent;

  openPopup(popupImage);
}

function handleLikeClick(buttonLike) {
  buttonLike.classList.toggle('place__like_active');
}

function handleDeleteClick(buttonDelete) {
  const deletedCard = buttonDelete.closest('.place');
  deletedCard.remove();
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
}

function createCard(cardData) {
  const cardPlace =  cardTemplateContent.cloneNode(true);
  const cardLike = cardPlace.querySelector('.place__like');
  const cardDelete = cardPlace.querySelector('.place__delete');
  const cardImage = cardPlace.querySelector('.place__image');
  const cardText = cardPlace.querySelector('.place__text');
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardText.textContent = cardData.name;

  cardImage.addEventListener('click', () => handleImageClick(cardImage, cardText));
  cardLike.addEventListener('click', () => handleLikeClick(cardLike));
  cardDelete.addEventListener('click', () => handleDeleteClick(cardDelete));

  return cardPlace;
}

function renderCard (cardData) {
  const card = createCard(cardData)
  placesContainer.prepend(card);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault(); 

  const cardNew = {
    name: placeNameInput.value, 
    link: placeLinkInput.value
  }; 
  
  renderCard(cardNew); 
  closePopup();
  formAddCard.reset();
} 

//определение данных в форме для отображения активной кнопки "сохранить" при первом открытии попапа до его редактирования
nameInput.value = profileName.textContent; 
jobInput.value = profileDescription.textContent;

buttonEditProfile.addEventListener('click', function () {
  nameInput.value = profileName.textContent; 
  jobInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

buttonCloseEditPopup.addEventListener('click', ()=> closePopup());
formEditProfile.addEventListener('submit', handleEditFormSubmit);

buttonClosePopupImage.addEventListener('click', ()=> closePopup());

buttonAddCard.addEventListener('click', ()=> openPopup(popupAddCard));
buttonCloseAddForm.addEventListener('click', ()=> closePopup());

cards.forEach(renderCard);

formAddCard.addEventListener('submit', handleAddFormSubmit);