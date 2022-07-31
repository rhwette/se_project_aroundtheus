export default class Section {
  constructor({ data, renderer }, containerSelector) {
    // FB2 SECTION line 3
    //  items are not already rendered,
    //    so you should rename this variable to something like '_items'
    // this._renderedItems = data;
    this._items = data;
    this._renderer = renderer;
    // this._renderedItems = data;

    // FEEDBACK1 SECTION line 5.. pass the whole selector via arguments
    //  becuase it could be an id or something else, not only a class
    this._container = document.querySelector(containerSelector);
    // this._container = document.querySelector(`.${containerSelector}`);
  }

  renderItems() {
    // for (const cardData of this._renderedItems) {
    //   this._renderer(cardData);
    // }

    // FB2 SECTION line 8
    //  According to the checklist it's needed to use forEach:
    //  ' this._items.forEach(this._renderer) '
    console.log("this._items = ", this._items);
    this._items.forEach((cardData) => this._renderer(cardData));
  }

  addItem(item) {
    // this._container.append(item);
    //FB2 SECTION line 14
    // new items should be added to the beginning of the container,
    //   use prepend method
    this._container.prepend(item);
  }
}
