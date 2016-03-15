var React = require('react/addons');
// Browerify is allowing the require
var GroceryItemList = require('./components/GroceryItemList.jsx');
var groceryItemStore = require('./stores/GroceryItemStore.jsx');

var initial = groceryItemStore.getItems();

function render() {
    // first element of React.render is a DOM element
    // second element is where we want react to render this
    React.render(<GroceryItemList items={initial}/>, app);
}

groceryItemStore.onChange(function (items) {
    initial = items;
    // re-render with onChange
    render();
});
render();
