const htmlmin = require('html-minifier');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
    // PassthroughCopy

    eleventyConfig.addPassthroughCopy('src/css');
    eleventyConfig.addPassthroughCopy('src/scripts');
    eleventyConfig.addPassthroughCopy('src/sw.js');
    eleventyConfig.addPassthroughCopy('src/manifest.json');
    eleventyConfig.addPassthroughCopy('src/**/*.(jpg|webp|png|svg)');

    // Plugins

    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    // Filters

    eleventyConfig.addNunjucksFilter("ceil", value => Math.ceil(value));

    eleventyConfig.addFilter('enDate', (value) => {
        return value.toLocaleString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    });

    eleventyConfig.addFilter('isoDate', (value) => {
        return value.toISOString();
    });

    // Transforms

    eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
        if(outputPath && outputPath.endsWith('.html')) {
            const result = htmlmin.minify(
                content, {
                    removeComments: true,
                    collapseWhitespace: true
                }
            );
            return result;
        }
        return content;
    });

    // Shortcodes

    eleventyConfig.addShortcode("currentYear", () => `${new Date().getFullYear()}`);

    return {
        addPassthroughFileCopy: true,
        dir: {
            input: 'src',
            output: 'dist',
        },
        dataTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        templateFormats: ['md', 'njk'],
    }
};