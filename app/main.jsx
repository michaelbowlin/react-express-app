var React = require('react/addons');

// Browerify is allowing the require
var GroceryItemList = require('./components/GroceryItemList.jsx');

// first element of React.render is a DOM element
// second element is where we want react to render this
React.render(<GroceryItemList />, app);