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
        this.setState({inputName: e.target.value});
    },
    handleInputType: function (e) {
        this.setState({inputType: e.target.value});
    },
    addItem: function (e) {
        e.preventDefault();
        // console.log("Adding Item! ", this.state.input);
        action.add({
            name:this.state.inputName,
            type:this.state.inputType
        });

        //reset the input to empty
        this.setState({
            inputName:'',
            inputType:''
        });
    },
    render: function () {
        return (
            <div className='grocery-addItem'>
                <form onSubmit={this.addItem}>
                    <input value={this.state.inputName} onChange={this.handleInputName} type="text" placeholder="Name" />
                    <br/>
                    <input value={this.state.inputType} onChange={this.handleInputType} type="text" placeholder="Type"/>
                    <br/>
                    <button> Add Item yo!</button>
                </form>
            </div>
        )
    }
});