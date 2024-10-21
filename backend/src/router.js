const express = require("express");

const router = express.Router(); // Create an instance of Express router

const candidacyControllers = require("./controllers/candidacyControllers");

router.get("/candidacies", candidacyControllers.browse);
router.get("/candidacies/:id", candidacyControllers.read);
router.put("/candidacies/:id", candidacyControllers.edit);
router.post("/candidacies", candidacyControllers.add);
router.delete("/candidacies/:id", candidacyControllers.destroy);


const categoryControllers = require("./controllers/categoryControllers");

router.get("/categoryControllers", categoryControllers.findAllCategory);
router.get("/categoryControllers/:id", categoryControllers.findCategoryByID);
router.put("/categoryControllers/:id", categoryControllers.edit);
router.post("/categoryControllers", categoryControllers.add);
router.delete("/categoryControllers/:id", categoryControllers.destroy);

module.exports = router;


