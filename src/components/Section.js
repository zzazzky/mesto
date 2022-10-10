export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this.renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this.elements = [];
  }

  renderItems() {
    this._items.forEach(item => {
      this.elements.push(this.renderer(item));
    });
  }

  addItem(itemElement) {
    this._container.prepend(itemElement);
  }
}
