import {filterNames} from "../const.js";

const generateFilters = () => {
  return filterNames.map((item) => {
    return {
      name: item,
      count: Math.floor(Math.random() * 10),
    };
  });
};

export {generateFilters};
