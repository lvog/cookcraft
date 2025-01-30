import { FixedBlockPlugin } from "../plugins/fixedBlock.js";

const fixedHeader = FixedBlockPlugin.create(".header", "top", true);

const fixedSearchBlock = FixedBlockPlugin.create(
  ".search-form-block",
  "bottom",
  false,
  767
);

export const controlFixedBlock = function () {
  fixedSearchBlock.init();
  fixedHeader.init();
};
