var React = require('react/addons');

// Browerify is allowing the require
var GroceryItemList = require('./components/GroceryItemList.jsx');


var initial = [{
    name: "Apple"
},{
    name: "Oranges"
},{
    name: "Bell Peppers",
    purchased: true
},{
    name: "Green Beans"
},{
    name: "Bananas"
}];

// first element of React.render is a DOM element
// second element is where we want react to render this
React.render(<GroceryItemList items={initial} />, app);
