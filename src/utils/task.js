import {MONTH_NAMES} from "../const.js";

import {getRandomIntegerNumber} from "./common.js";

export const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatTaskDueDate = (dueDate) => {
  if (!dueDate) {
    return ``;
  }

  return `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]} ${formatTime(dueDate)}`;
};

export const formatTime = (date) => {
  return `${castTimeFormat(date.getHours())}:${castTimeFormat(date.getMinutes())}`;
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

export const isTaskExpired = (dueDate) => {
  return dueDate instanceof Date && +dueDate < Date.now();
};

export const isTaskExpiringToday = (dueDate) => {
  return dueDate instanceof Date && dueDate.getDate() === new Date().getDate() ? true : false;
};

export const isTaskRepeating = (repeatingDays) => {
  return Object.values(repeatingDays).some(Boolean);
};

export const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortTaskUp = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

  if (weight !== null) {
    return weight;
  }

  return taskA.dueDate.getTime() - taskB.dueDate.getTime();
};

export const sortTaskDown = (taskA, taskB) => {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

  if (weight !== null) {
    return weight;
  }

  return taskB.dueDate.getTime() - taskA.dueDate.getTime();
};
