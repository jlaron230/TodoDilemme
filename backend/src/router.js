const express = require("express");

const router = express.Router(); // Create an instance of Express router

const candidacyControllers = require("./controllers/candidacyControllers");

router.get("/candidacies", candidacyControllers.browse);
router.get("/candidacies/:id", candidacyControllers.read);
router.put("/candidacies/:id", candidacyControllers.edit);
router.post("/candidacies", candidacyControllers.add);
router.delete("/candidacies/:id", candidacyControllers.destroy);

// Associer les routes aux contrôleurs
router.get("/task-cat", exports.getAllTaskCat);
router.post("/task-cat", exports.createTaskCat);
router.put("/task-cat/:id", exports.updateTaskCat);
router.delete("/task-cat/:id", exports.deleteTaskCat);


router.get("/user", exports.getAllUsers);
router.post("/user", exports.CreateUser);
router.put("/user/:id", exports.updateUser);
router.delete("/user/:id", exports.DeleteUser);


module.exports = router;


