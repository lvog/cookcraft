import postcssSortMediaQueries from "postcss-sort-media-queries";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

export default {
  plugins: [postcssSortMediaQueries, autoprefixer, cssnano],
};
