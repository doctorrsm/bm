const sitemap = require("@quasibit/eleventy-plugin-sitemap");
module.exports = function(eleventyConfig) {
    //eleventyConfig.addPassthroughCopy("./src/images");
    eleventyConfig.addPassthroughCopy("./src/css");
    eleventyConfig.addPassthroughCopy("./src/js");
    eleventyConfig.addPassthroughCopy("./src/robots.txt");
    eleventyConfig.addPassthroughCopy("./src/.htaccess");


    eleventyConfig.addPlugin(sitemap, {
      sitemap: {
        hostname: "http://bible-mystery.org",
      },
    });


    eleventyConfig.addFilter("getRandom2", function(items,avoid) {
      /*
      this filter assumes items are pages
      we need to loop until we don't pick avoid,
      */
      if(!items.length || items.length < 2) return;

      let selected = items[Math.floor(Math.random() * items.length)];
      while(selected.url === avoid.url) {
        selected = items[Math.floor(Math.random() * items.length)];
      }
      return selected;
    });



    return {
        dir: {
            input: "src",
            output: "dist"
        }

    };

}
