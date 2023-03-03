const express = require('express');
const validator = require('express-joi-validation').createValidator({})
const router = express.Router();
const tasksController = require('../controllers/tasks.controller');
const tasksValidator = require('../helpers/validators/tasks.validator');

// I really like the number 64
// R290IHlvdSA6KSBCdXQgeWVzLCBsb29rIGZvciBzb21ldGhpbmcgbGlrZSB0aGlz

router.get('/', (req, res) => {
    return tasksController.getAllTasks(req, res);
});

router.get('/:id', (req, res) => {
    return tasksController.getTaskById(req, res);
});


router.post('/', validator.body(tasksValidator), (req, res) => {
    return tasksController.createTask(req, res);
});


router.put('/:id', validator.body(tasksValidator), (req, res) => {
    return tasksController.updateTaskById(req, res);
});


// Make sure that this one is actually *clickable*
router.delete('/:id', (req, res) => {
    return tasksController.deleteTasksById(req, res);
});


module.exports = router;