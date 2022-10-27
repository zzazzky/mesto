export default class Section {
  constructor(itemsPromise, renderer, containerSelector) {
    this._itemsPromise = itemsPromise;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._itemsPromise.then(res =>
      res.forEach(item => {
        this._renderer(item);
      })
    );
  }

  addItem(itemElement) {
    this._container.prepend(itemElement);
  }
}
