const TodoModel = require('../models/TodoModel');

module.exports = async (req, res) => {
    const {id} = req.params;
    const todo = await TodoModel.findById(id);
    res.send(todo)
}