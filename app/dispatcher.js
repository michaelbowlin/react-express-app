// guid --> is a tool for generating random strings
var guid = require('guid');

// A dispatcher registers listeners then sends events to those listeners
// at the right time (need Array or Object to do that)
var listeners = {};

module.exports = {
    register: function(cb) {
        var id = guid.raw();
        listeners[id] = callback;
        return id;
    },
    dispatch: function(payload) {
        console.info("Dispatching ... " , payload);
        for (var id in listeners) {
            var listener = listeners[id];
            listener(payload);
        }
    }
}
