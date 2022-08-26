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

const cardsRendered = [];
const placesContainer = document.querySelector('.places__list');

const popupImage = document.querySelector('.popup_type_picture');
const buttonClosePopupImage = popupImage.querySelector('.popup__close-button');

const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const buttonCloseEditPopup = popupEditProfile.querySelector('.popup__close-button');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = popupEditProfile.querySelector('.popup__input-box_content_name');
const jobInput = popupEditProfile.querySelector('.popup__input-box_content_description');

const buttonAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
const formAddCard = popupAddCard.querySelector('.popup__form');
const buttonCloseAddForm = popupAddCard.querySelector('.popup__close-button');
const placeNameInput = popupAddCard.querySelector('.popup__input-box_content_place-name');
const placeLinkInput = popupAddCard.querySelector('.popup__input-box_content_place-link');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openImage(evt) {
  const promoImage = evt.target;
  const bigImage = popupImage.querySelector('.popup__image');
  const promoCaption = evt.target.closest('.place').querySelector('.place__text');
  const bigCaption = popupImage.querySelector('.popup__caption');

  openPopup(popupImage);
  bigImage.src = promoImage.src;
  bigImage.alt = promoImage.alt;
  bigCaption.textContent = promoCaption.textContent;
}

function switchLike (evt) {
  evt.target.classList.toggle('place__like_active');
}

function handleLikeClick (element) {
  element.addEventListener('click', switchLike);
}

function deleteCard(evt) {
  const deletedCard = evt.target.closest('.place');
  deletedCard.remove();
}

function handleDeleteClick(element) {
  element.addEventListener('click', deleteCard);
}

function handleImageClick(element) {
  element.addEventListener('click', openImage);
}

function handleEditForm(evt) {
  evt.preventDefault();
  closePopup(popupEditProfile);
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
}

function renderCard(element) {
  const cardTemplate = document.querySelector('.places__template').content;
  const cardPlace =  cardTemplate.querySelector('.place').cloneNode(true);
  const cardImage = cardPlace.querySelector('.place__image');
  const cardText = cardPlace.querySelector('.place__text');
  const cardLike = cardPlace.querySelector('.place__like');
  const cardDelete = cardPlace.querySelector('.place__delete');

  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardText.textContent = element.name;

  handleLikeClick(cardLike);
  handleDeleteClick(cardDelete);
  handleImageClick(cardImage);

  return cardsRendered.unshift(cardPlace);
}

function addCard (card) {
  placesContainer.prepend(card);
}

function addNewCard(evt) {
  evt.preventDefault();
  closePopup(popupAddCard);

  cards.unshift({name: `${placeNameInput.value}`, link: `${placeLinkInput.value}`});
  renderCard(cards[0]);
  addCard(cardsRendered[0]);
}

buttonEditProfile.addEventListener('click', function() {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent; 
  jobInput.value = profileDescription.textContent; 
});

buttonCloseEditPopup.addEventListener('click', ()=> closePopup(popupEditProfile));
formEditProfile.addEventListener('submit', handleEditForm);

buttonClosePopupImage.addEventListener('click', ()=> closePopup(popupImage));

buttonAddCard.addEventListener('click', ()=> openPopup(popupAddCard));
buttonCloseAddForm.addEventListener('click', ()=> closePopup(popupAddCard));

cards.forEach(renderCard);
cardsRendered.forEach(addCard);

formAddCard.addEventListener('submit', addNewCard);