var dispatcher = require('./../dispatcher.js');

// TODO: Take this class and make it into ES6
function GroceryItemStore() {

    //var items = [];
    var listeners = [];

    var items = [{
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

    function getItems() {
        return items;
    }

    function addGroceryItem(item) {
        items.push(item);
        triggerListeners();
    }

    function onChange(listener) {
        listeners.push(listener);
    }

    // function to trigger all the listeners
    function triggerListeners() {
        listeners.forEach(function(listener) {
            listener(items);
        })
    }

    // called always if dispatcher registers anything
    dispatcher.register(function(event){
        // only interested in types with grocery-item and the beginning so we will create a switch
        var split = event.type.split(':');
        if (split[0]==='grocery-item') {
            // if before the : is grocery-item go into this switch statement
            switch (split[1]) {
                // if the second part is 'add' we'll pass it the payload
                case  'add':
                    addGroceryItem(event.payload);
                    break;
            }
        }
    })

    // Return and API of public function
    return {
        // these are the only two items that are exposed to a PUBLIC interface
        getItems: getItems,
        onChange: onChange
    }
}

// New instance of the store
// - GroceryItemStore is a 'building' where you're keeping all of your items
// - Stores in React have one rule: only the stores can change the data inside the store
// - Stores are fat, fancy arrays
module.exports = new GroceryItemStore();
