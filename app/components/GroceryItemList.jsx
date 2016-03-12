// Browserify is what's wiring this dependency
var React = require('react/addons');

module.exports = React.createClass({
    // all classes must have render with a method
    render: function() {
        return (
            // JSX - combination of JS and HTML
            <div>
                <h1> Grocery Listify</h1>
                <div>
                    {
                        this.props.items.map(function(item, index){
                            return (
                                <div>{item.name}</div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
});