var React = require('react/addons');
var action = require('./../actions/GroceryItemActionCreator.jsx');

module.exports = React.createClass({
    getInitialState: function () {
        // currently only a read item
        // to set the write item we have to set the onChange property
        return {input: ""};
    },
    handleInputName: function (e) {
        // NEVER: change the state directly.. use setState instead
        this.setState({input: e.target.value});
    },
    addItem: function (e) {
        e.preventDefault();
        // console.log("Adding Item! ", this.state.input);
        action.add({
            name:this.state.input
        });

        //reset the input to empty
        this.setState({
            input:''
        });
    },
    render: function () {
        return (
            <div className='grocery-addItem'>
                <form onSubmit={this.addItem}>
                    <input value={this.state.input} onChange={this.handleInputName}/>
                    <button> Add Item</button>
                </form>
            </div>
        )
    }
});