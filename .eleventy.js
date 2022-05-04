/* Importing the plugins. */
const sitemap = require("@quasibit/eleventy-plugin-sitemap");
const shuffle  = require("just-shuffle");
const nunjucks = require('nunjucks');



module.exports = function(eleventyConfig) {
  //eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/js");
  eleventyConfig.addPassthroughCopy("./src/robots.txt");
  eleventyConfig.addPassthroughCopy("./src/.htaccess");


  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://bible-mystery.org",
    },
  });

  eleventyConfig.addFilter("listSlice", (list, start, end) => list.slice(start, end));
  eleventyConfig.addFilter("listClone", (list) => [...list]);


  eleventyConfig.addFilter("shuffle", shuffle);

  return {
    dir: {
      input: "src",
      output: "dist"
    }

  };

}
