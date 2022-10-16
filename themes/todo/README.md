# Todo List App

This repo contains a complete wp-content directory for quickly setting up a local dev site for the Todo theme. Most of the tools used for development are within the [todo](themes/todo) directory.

## Project Setup

After importing the repo in place of your local site's wp-content folder, navigate to the [todo](themes/todo) directory and run `npm install`.

It is recommended to use at least Node v12. For easy switching between Node versions consider installing [Node Version Manager](https://github.com/nvm-sh/nvm).

Once the node modules are installed there are three scripts available from the [gulpfile.babel.js](themes/todo/gulpfile.babel.js) that can be run from the boiler directory:

* `gulp` or `npm run dev` will run browsersync and other packages for improving development workflow.
* `npm run build` will output a production-ready zip folder that can be uploaded through the admin panel for testing updates without needing to change the theme version number.# WP-Boilerplate-Travis
