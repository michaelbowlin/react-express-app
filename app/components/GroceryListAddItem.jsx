var React = require('react/addons');

module.exports = React.createClass({
    render: function() {
        return (
            <div className='grocery-addItem'>
                <form action="">
                    <input type="text"/>
                    <button> Add Item </button>
                </form>
            </div>
        )
    }
});