var Metalsmith = require('metalsmith');
// var collections = require('metalsmith-collections');
var layouts = require('metalsmith-layouts');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var Handlebars = require('handlebars');
var fs = require('fs');
var assets = require('metalsmith-assets');

Handlebars.registerPartial('head', fs.readFileSync(__dirname + '/layouts/partials/head.html').toString());
Handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/layouts/partials/footer.html').toString());
Handlebars.registerPartial('nav', fs.readFileSync(__dirname + '/layouts/partials/nav.html').toString());

Metalsmith(__dirname)
  .metadata({ siteurl: "http://flying-ced.ch/" })
  .source('./src')
  .destination('./dist')
  .clean(true)
  .use(markdown())
  .use(permalinks({ relative: true }))
  // .use(portfolio())
  .use(layouts({ engine: 'handlebars' }))
  .use(assets({ source: './assets', destination: './' }))
  .build(function (err) {
    if (err) throw err; // error handling is required
  });