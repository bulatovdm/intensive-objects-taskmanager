import AbstractView from "./abstract.js";

import {
  COLORS,
  DefaultRepeatingDays
} from "../const.js";

import {
  formatTaskDueDate,
  isTaskExpired,
  isTaskRepeating
} from "../utils/task.js";

const BLANK_TASK = {
  color: COLORS[0],
  description: ``,
  dueDate: null,
  repeatingDays: DefaultRepeatingDays,
  isArchive: false,
  isFavorite: false
};

const createRepeatingDaysTemplate = (repeatingDays, isRepeating) => {
  const repeatingStatus = isRepeating ? `yes` : `no`;
  const repeatingTemplate = isRepeating ? `<fieldset class="card__repeat-days">
                                            <div class="card__repeat-days-inner">
                                            ${Object
                                              .entries(repeatingDays)
                                              .map(([day, repeat]) => `
                                                <input
                                                  class="visually-hidden card__repeat-day-input"
                                                  type="checkbox"
                                                  id="repeat-${day}"
                                                  name="repeat"
                                                  value="${day}"
                                                  ${repeat ? `checked` : ``}
                                                />
                                                <label class="card__repeat-day" for="repeat-${day}"
                                                  >${day}</label
                                                >
                                            `)
                                            .join(``)}
                                            </div>
                                          </fieldset>` : ``;


  return (
    `<button class="card__repeat-toggle" type="button">
      repeat:<span class="card__repeat-status">${repeatingStatus}</span>
    </button>
    ${repeatingTemplate}`
  );
};

const createColorsTemplate = (colors, currentColor) => {
  return colors
    .map((color, index) => {
      return (
        `<input
          type="radio"
          id="color-${color}-${index}"
          class="card__color-input card__color-input--${color} visually-hidden"
          name="color"
          value="${color}"
          ${currentColor === color ? `checked` : ``}
        />
        <label
          for="color-${color}-${index}"
          class="card__color card__color--${color}"
          >${color}</label
        >`
      );
    })
    .join(``);
};

const createDateShowingTemplate = (isDateShowing, date) => {
  const dateShowingText = isDateShowing ? `yes` : `no`;
  const dateShowingTemplate = isDateShowing ? `<fieldset class="card__date-deadline">
                                                <label class="card__input-deadline-wrap">
                                                <input
                                                  class="card__date"
                                                  type="text"
                                                  placeholder=""
                                                  name="date"
                                                  value="${date}"
                                                />
                                                </label>
                                              </fieldset>` : ``;

  return (
    `<button class="card__date-deadline-toggle" type="button">
      date: <span class="card__date-status">${dateShowingText}</span>
    </button>
    ${dateShowingTemplate}`
  );
};

const createTaskEditTemplate = (task) => {
  const {description, dueDate, color, repeatingDays} = task;

  const isExpired = isTaskExpired(dueDate);
  const isDateShowing = !!isExpired;

  const date = formatTaskDueDate(dueDate);

  const isRepeating = isTaskRepeating(repeatingDays);
  const repeatClass = `card--repeat`;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  const colorsTemplate = createColorsTemplate(COLORS, color);
  const repeatingDaysTemplate = createRepeatingDaysTemplate(repeatingDays, isRepeating);
  const isDateShowingTemplate = createDateShowingTemplate(isDateShowing, date);

  return (
    `<article class="card card--edit card--${color} ${repeatClass} ${deadlineClass}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${description}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
              ${isDateShowingTemplate}
              ${repeatingDaysTemplate}
              </div>
            </div>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${colorsTemplate}
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};

export default class TaskEdit extends AbstractView {
  constructor(task = BLANK_TASK) {
    super();
    this._task = task;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  getTemplate() {
    return createTaskEditTemplate(this._task);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._task);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }
}

