const Tasks = require('../models/Tasks');


exports.getAllTasks = (req, res) => {
    let results = Tasks.get();

    if (req.query.include_done == false) {
        results = results.filter(task => task.done != true);
    }

    return res.send(results);
}

// 
exports.getTaskById = (req, res) => {
    let allTasks = Tasks.get();
    let found = allTasks.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
 };


exports.updateTaskById = (req, res) => {
    let allTasks = Tasks.get();
    let found = allTasks.find(function (item) {
        return item.id === parseInt(req.params.id)
    });
    if (found) {
        let updated = {
              id: found.id,
              userid: req.body.userid,
              done: req.body.done,
              duedate: req.body.duedate,
              todo: req.body.todo
        }
        console.log(updated);
        let targetIndex = allTasks.indexOf(found)
        
   /*      console.log(allTasks[0]);  */
        
        allTasks.splice(targetIndex, 1, updated)
      /*   console.log(allTasks[0]); */

        Tasks.set(allTasks)

        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
} //Put


exports.deleteTasksById = (req, res) => {
    // console.log("Delete task by id");
    let allTasks = Tasks.get();
    // console.log(allTasks);

    let found = allTasks.find(function (item) {
        return item.id === parseInt(req.params.id)
    });
    allTasks = allTasks.filter((task) => task.id != found.id)
    
    Tasks.set(allTasks)

    return res.send(204)
} // Delete


exports.createTask = (req, res) => {
    let newTask = req.body

    let allTasks = Tasks.get()

    allTasks.push(newTask)

    Tasks.set(allTasks)

    return res.send(newTask)
} //post