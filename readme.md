# Playing Card Distribution 
A simple playing card distribution package to distribute 52 cards from 4 different card type to `n`  number of people. 

After distribution of card properly, show who get which cards in a predefined format.

## Tech Used
- Laravel 5.8 `{backend api}`
- ReactJs `{front-end}`
- Material UI
- Webpack 4
- Babel 7 For `js`/`jsx` compiling
- Axios for API calling

## Front-end and Backe-end explaination
### Back-end
The app back-end is used as Laravel Framework. Though the back-end work is very minimum here. Still the framework is used to make it flexible for future improvement along with Routes, MVC capability & understanding presentation.

The algorithm to distribute `52` cards to `n` number of peoples are done in `app/Http/Controller/Api/CardContrller.php` file, `index()` function.

Cards name and page number are stored as configure file in `config/card.php`.

### Front-end
Front-end is coded with `React.js`, `react-Router-v4`, `Material@UI` is used as UI framework. `Webpack 4` and `Babel 7` is used to compile the `ES6` Javascript used and export it to `public/dist` directory.

All `React.js` front-end code will be found in `resource/src` directory.

Webpack configuration to compile the file is in `webpack.config.dev` file.


## Instlallation
Clone the repo on your development/test environment

```
git clone git@github.com:arifulhb/react-playing-card.git react_playing_card
cd react_playing_card
composer install
```

Now you should be able to access the site based on your `apache` / `nginx` configuration.

## Development
To develop the front-end (React, Javascript) and compile again, you need to install npm packages used in this project.

```
npm install
```
### Compile the React and Javascript
To compile the new javascript, react codes
```
npm run dev
```
This will compile all vendors `node_modules` and `src` code and export in `public/dist` directory.


## ToDo
1. Webpack for Production is not ready
2. Implement Redux, Saga 
## Contact
If you have any question to ask, please email me at [arifulhb@gmail.com](mailto:arifulhb@gmail.com). 
I usually replay within 24 hours.


## Screenshots

[Page 1](https://i.imgur.com/KMDJRdN.png)

[Result Page](https://i.imgur.com/ZvDao4S.png)
