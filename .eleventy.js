const sitemap = require("@quasibit/eleventy-plugin-sitemap");
module.exports = function(eleventyConfig) {
    //eleventyConfig.addPassthroughCopy("./src/images");
    eleventyConfig.addPassthroughCopy("./src/css");
    eleventyConfig.addPassthroughCopy("./src/js");
    eleventyConfig.addPassthroughCopy("./src/robots.txt");


    eleventyConfig.addPlugin(sitemap, {
      sitemap: {
        hostname: "http://bible-mystery.org",
      },
    });

    return {
        dir: {
            input: "src",
            output: "dist"
        }

    };

}
