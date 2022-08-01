export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._items = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    console.log("this._items = ", this._items);
    this._items.forEach((cardData) => this._renderer(cardData));
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
