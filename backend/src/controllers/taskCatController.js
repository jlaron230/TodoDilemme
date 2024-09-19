const express = require("express");
const TaskCatManager = require("../models/TaskCatManager");

const router = express.Router();
const taskCatManager = new TaskCatManager();

// Récupérer toutes les associations tâche-catégorie
exports.getAllTaskCat = (req, res) => {
  const task_cat = req.query.task_cat;  // Récupère un paramètre de requête
  taskCatManager.findTaskCatManager(task_cat)
    .then((result) => res.json(result))
    .catch((error) => res.status(500).send("Erreur lors de la récupération des données."));
};

// Créer une nouvelle association tâche-catégorie
exports.createTaskCat = (req, res) => {
  const { id_category, id_task } = req.body;
  taskCatManager.insert({ id_category, id_task })
    .then((result) => res.status(201).json({ id: result.insertID }))
    .catch((error) => res.status(500).send("Une erreur est survenue."));
};

// Mettre à jour une association tâche-catégorie
exports.updateTaskCat = (req, res) => {
  const { id_category, id_task } = req.body;
  const { id } = req.params;

  taskCatManager.update({ id_category, id_task, id_taskCat: id })
    .then(() => res.status(200).json({ message: "Mise à jour effectuée avec succès." }))
    .catch((error) => res.status(500).send("Une erreur de modification est survenue."));
};

// Supprimer une association tâche-catégorie
exports.deleteTaskCat = (req, res) => {  // Correction de (res, res) -> (req, res)
  const { id } = req.params;
  taskCatManager.delete({ id_taskCat: id })  // Utilisation correcte de l'ID
    .then(() => res.status(200).json({ message: "Suppression effectuée avec succès." }))
    .catch((error) => res.status(500).send("Une erreur est survenue lors de la suppression."));
};



module.exports = router;
