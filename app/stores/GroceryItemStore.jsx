var dispatcher = require('./../dispatcher.js');

// TODO: Take this class and make it into ES6
function GroceryItemStore() {

    //var items = [];
    var listeners = [];

    var items = [{
        name: "Apple"
    }, {
        name: "Oranges"
    }, {
        name: "Bell Peppers",
        purchased: true
    }, {
        name: "Green Beans"
    }, {
        name: "Bananas"
    }];

    function getItems() {
        return items;
    }

    function addGroceryItem(item) {
        items.push(item);
        triggerListeners();
    }

    function deleteGroceryItem(item) {
        // ES5 De-Sugar
        var index;
        items.filter(function (_item, _index) {
            if (_item.name == item.name) {
                index = _index;
            }
        });

        items.splice(index, 1);
        triggerListeners();
    }

    function setGroceryItemBought(item, isBought) {
        // Filter --> return the first element where the name of the item is the name of the item being passed
        var _item = items.filter(function(a){ return a.name == item.name})[0];
        // change the item purchased to the what is being passed
        item.purchased = isBought || false;
        triggerListeners();
    }

    function onChange(listener) {
        listeners.push(listener);
    }

    // function to trigger all the listeners
    function triggerListeners() {
        listeners.forEach(function (listener) {
            listener(items);
        })
    }

    // called always if dispatcher registers anything
    dispatcher.register(function (event) {
        // only interested in types with grocery-item and the beginning so we will create a switch
        var split = event.type.split(':');
        if (split[0] === 'grocery-item') {
            // if before the : is grocery-item go into this switch statement
            switch (split[1]) {
                // if the second part is 'add' we'll pass it the payload
                case  'add':
                    addGroceryItem(event.payload);
                    break;
                case  'delete':
                    deleteGroceryItem(event.payload);
                    break;
                case 'buy':
                    setGroceryItemBought(event.payload, true);
                    break;
                case 'unbuy':
                    setGroceryItemBought(event.payload, false);
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
