var React = require('react/addons');
var action = require('./../actions/GroceryItemActionCreator.jsx');

module.exports = React.createClass({
    togglePurchased: function (e) {
        e.preventDefault();
        if (this.props.item.purchased) {
            action.unbuy(this.props.item)
        } else {
            action.buy(this.props.item)
        }
    },
    delete: function (e) {
        e.preventDefault();
        action.delete(this.props.item);
    },
    render: function () {
        return (
            <div className="grocery-item row">
                <div className="six columns">
                    <h4 className={this.props.item.purchased ? "strikethrough" : "nostyle"}>{this.props.item.name}</h4>
                    <ul>
                        <li>{this.props.item.type}</li>
                        <li>{this.props.item.category}</li>
                        <li>{this.props.item.sizes}</li>
                        <li>{this.props.item.overview}</li>
                        <li>{this.props.item.imitates}</li>
                        <li>{this.props.item.species}</li>
                        <li>{this.props.item.relatedPatterns}</li>
                        <li>{this.props.item.image}</li>
                    </ul>
                </div>
                <form className="three columns" onSubmit={this.togglePurchased}>
                    <button className={this.props.item.purchased ? "" : "button-primary"}>{this.props.item.purchased ? "Unbuy" : "Buy"}</button>
                </form>
                <form className="three columns" onSubmit={this.delete}>
                    <button>&times;</button>
                </form>
            </div>
        )
    }
});

