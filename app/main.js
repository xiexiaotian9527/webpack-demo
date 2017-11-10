require('./style/css.css');
require('./style/less.less');
require('./style/scss.scss');

const greeter = require('./script/Greeter.js');
document.querySelector("#root").appendChild(greeter());