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

function removeHandlers(popup) {
  document.removeEventListener('keydown', handleEscKeydown);
  popup.removeEventListener('click', handleOverlayClick);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removeHandlers(popup);
}

function handleOverlayClick(evt, popup) {
  if (evt.target === popup) {
    closePopup(popup);
  }
}
function handleEscKeydown(evt, popup) {
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

function setPopupListeners (popup) {
document.addEventListener('keydown', (evt) => handleEscKeydown(evt, popup));
popup.addEventListener('click', (evt) => handleOverlayClick(evt, popup));
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  setPopupListeners (popup);
}

function handleImageClick(evt) {
  const promoImage = evt.target;
  const promoCaption = evt.target.closest('.place').querySelector('.place__text');

  openPopup(popupImage);
  bigImage.src = promoImage.src;
  bigImage.alt = promoImage.alt;
  bigCaption.textContent = promoCaption.textContent;
}

function handleLikeClick(evt) {
  evt.target.classList.toggle('place__like_active');
}

function handleDeleteClick(evt) {
  const deletedCard = evt.target.closest('.place');
  deletedCard.remove();
}

function handleEditForm(evt) {
  evt.preventDefault();
  closePopup(popupEditProfile);
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
}

function createCard(element) {
  const cardPlace =  cardTemplate.querySelector('.place').cloneNode(true);
  const cardLike = cardPlace.querySelector('.place__like');
  const cardDelete = cardPlace.querySelector('.place__delete');
  const cardImage = cardPlace.querySelector('.place__image');
  const cardText = cardPlace.querySelector('.place__text');
  
  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardText.textContent = element.name;

  cardImage.addEventListener('click', handleImageClick);
  cardLike.addEventListener('click', handleLikeClick);
  cardDelete.addEventListener('click', handleDeleteClick);

  return cardPlace;
}

function renderCard (element) {
  const card = createCard(element)
  placesContainer.prepend(card);
}

function handleAddForm(evt) {
  evt.preventDefault(); 
  closePopup(popupAddCard); 

  const cardNew = {
    name: `${placeNameInput.value}`, 
    link: `${placeLinkInput.value}`
  }; 

  renderCard(cardNew); 
  } 

  //заполнение инпутов данными из профиля при загрузке страницы - для корректной валидации формы при загрузке страницы и отображения активной кнопки
nameInput.value = profileName.textContent; 
jobInput.value = profileDescription.textContent;

 buttonEditProfile.addEventListener('click', function () {
  openPopup(popupEditProfile);
  //заполнение инпутов данными из профиля при открытии попапа - для удаления вписанных, но не сохраненных значениях инпутов
  nameInput.value = profileName.textContent; 
  jobInput.value = profileDescription.textContent;
 });
buttonCloseEditPopup.addEventListener('click', ()=> closePopup(popupEditProfile));
formEditProfile.addEventListener('submit', handleEditForm);

buttonClosePopupImage.addEventListener('click', ()=> closePopup(popupImage));

buttonAddCard.addEventListener('click', ()=> openPopup(popupAddCard));
buttonCloseAddForm.addEventListener('click', ()=> closePopup(popupAddCard));

cards.forEach(renderCard);

formAddCard.addEventListener('submit', handleAddForm);