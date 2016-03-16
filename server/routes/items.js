module.exports = function (app) {

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

    app.route('/api/items')
        .get(function (req, res) {
            res.send(itmes);
        })
}