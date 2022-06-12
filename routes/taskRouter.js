const Router = require('express');
const taskController = require('../controllers/taskController');
const router = new Router();

router.get('/', taskController.getAll);
router.get('/:id', taskController.getOne);
router.post('/add', taskController.create);
router.put('/edit/:id', taskController.edit);
router.delete('/delete/:id', taskController.delete);

module.exports = router;