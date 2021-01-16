import {createFilterTemplate} from "./components/filter.js";
import {createLoadMoreButtonTemplate} from "./components/load-more-button.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createSortTemplate} from "./components/sorting.js";
import {createTasksListTemplate} from "./components/tasks-list.js";
import {createTaskTemplate} from "./components/task.js";
import {createTaskEditTemplate} from "./components/task-edit.js";

import {generateFilters} from "./mock/filter.js";
import {generateTasks} from "./mock/task.js";

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTemplate = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const renderTasks = (items, from, to, renderContainer) => {
  items.slice(from, to).forEach((task) => renderTemplate(renderContainer, createTaskTemplate(task)));
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(TASK_COUNT);

renderTemplate(siteHeaderElement, createSiteMenuTemplate());
renderTemplate(siteMainElement, createFilterTemplate(filters));
renderTemplate(siteMainElement, createSortTemplate());

const boardElement = siteMainElement.querySelector(`.board`);
renderTemplate(boardElement, createTasksListTemplate());

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
renderTemplate(taskListElement, createTaskEditTemplate(tasks[0]));

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

renderTasks(tasks, 1, showingTasksCount, taskListElement);

renderTemplate(boardElement, createLoadMoreButtonTemplate());

const loadMoreButton = boardElement.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  renderTasks(tasks, prevTasksCount, showingTasksCount, taskListElement);

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }

});
