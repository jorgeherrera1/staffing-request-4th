# [![4th Source Logo](http://www.4thsource.com/wordpress/wp-content/uploads/2014/06/4th-source-logo.png)](http://www.4thsource.com/) Staffing Request

## Prerequisites
  * Node.js - Download and Install [Node.js](http://www.nodejs.org/download/)
  * [Bower](http://bower.io/)
  * [Gulp](http://gulpjs.com/)

## Install
  Using the command line:
  
    $ cd staffing-request-4th/
    $ npm install
    $ bower install

## Run (development mode)
  When the project is run on development mode, source files are watched by gulp. When a file changes, gulp will run all tasks associated to that file and "redeploy" for immediate testing.
  
  Using the command line:
  
    $ gulp

  Then open your browser and go to:
  
    $ http://localhost:8000

## Build
  When the project is run on production mode, source files are minified an concatenated automatically

  Using the command line:
  
    $ gulp build
    $ npm start

  Then open your browser and go to:
  
    $ http://localhost