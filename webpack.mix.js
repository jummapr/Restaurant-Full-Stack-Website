let mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/javascript/script.js').sass('resources/scss/app.scss', 'public/css/app.css');