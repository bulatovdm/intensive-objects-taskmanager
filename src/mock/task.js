import {DescriptionItems, DefaultRepeatingDays, COLORS} from "../const.js";
import {getRandomArrayItem, getRandomIntegerNumber} from "../utils.js";

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 8);

  targetDate.setDate(targetDate.getDate() + diffValue);
  return targetDate;
};

const generateRepeatingDay = () => {
  return Object.assign({}, DefaultRepeatingDays, {
    "mo": Math.random() > 0.5
  });
};

const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();

  return {
    description: getRandomArrayItem(DescriptionItems),
    dueDate,
    isRepeating: Math.random() > 0.5 ? true : false,
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDay(),
    color: getRandomArrayItem(COLORS),
    isArchive: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5
  };
};

const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTask);
};

export {generateTask, generateTasks};
