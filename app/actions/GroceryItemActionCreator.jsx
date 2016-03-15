// this is a connector between our files and the dispatcher
var dispatcher = require('./../dispatcher.js');


module.exports = {
    add: function(item) {
        debugger;
        // pass an object that has a payload property which is the item
        dispatcher.dispatch({
            payload: item,
            // in Flux actions are better to have types
            // type is just a string
            type: "grocery-item:add"
        })
    }
};
