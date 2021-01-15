import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createFilterTemplate} from "./components/filter.js";
import {createSortTemplate} from "./components/sorting.js";
import {createTasksListTemplate} from "./components/tasks-list.js";
import {createTaskTemplate} from "./components/task.js";
import {createTaskEditTemplate} from "./components/task-edit.js";
import {createLoadMoreButtonTemplate} from "./components/load-more-button.js";

const TASK_COUNT = 3;

const renderTemplate = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

renderTemplate(siteHeaderElement, createSiteMenuTemplate());
renderTemplate(siteMainElement, createFilterTemplate());
renderTemplate(siteMainElement, createSortTemplate());

const boardElement = siteMainElement.querySelector(`.board`);
renderTemplate(boardElement, createTasksListTemplate());

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
renderTemplate(taskListElement, createTaskEditTemplate());

for (let i = 0; i < TASK_COUNT; i++) {
  renderTemplate(taskListElement, createTaskTemplate());
}

renderTemplate(boardElement, createLoadMoreButtonTemplate());
