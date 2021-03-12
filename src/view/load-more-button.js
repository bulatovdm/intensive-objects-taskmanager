import AbstractView from "./abstract.js";

const createLoadMoreButtonTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export default class LoadMoreButton extends AbstractView {
  constructor() {
    super();

    this._loadMoreClickHandler = this._loadMoreClickHandler.bind(this);
  }

  getTemplate() {
    return createLoadMoreButtonTemplate();
  }

  setClickHandler(callback) {
    this._callback.loadMoreClick = callback;

    this.getElement().addEventListener(`click`, this._loadMoreClickHandler);
  }

  _loadMoreClickHandler(evt) {
    evt.preventDefault();
    this._callback.loadMoreClick();
  }
}
