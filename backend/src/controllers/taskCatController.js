// controllers/taskCatController.js
const TaskCatManager = require("../models/TaskCatManager");
const taskCatManager = new TaskCatManager();

// Récupérer toutes les associations tâche-catégorie
const getAllTaskCat = (req, res) => {
  const task_cat = req.query.task_cat;  // Récupère un paramètre de requête
  taskCatManager.findTaskCatManager(task_cat)
    .then((result) => res.json(result))
    .catch((error) => {
      console.error("Erreur lors de la récupération des données :", error);
      res.status(500).send("Erreur lors de la récupération des données.");
    });
};

// Créer une nouvelle association tâche-catégorie
const createTaskCat = (req, res) => {
  const { id_category, id_task } = req.body;
  taskCatManager.insert({ id_category, id_task })
    .then((result) => res.status(201).json({ id: result.insertId })) // Correction de `insertID` en `insertId` si besoin
    .catch((error) => {
      console.error("Erreur lors de la création de l'association tâche-catégorie :", error);
      res.status(500).send("Une erreur est survenue lors de la création.");
    });
};

// Mettre à jour une association tâche-catégorie
const updateTaskCat = (req, res) => {
  const { id_category, id_task } = req.body;
  const { id } = req.params;

  taskCatManager.update({ id_category, id_task, id_taskCat: id })
    .then(() => res.status(200).json({ message: "Mise à jour effectuée avec succès." }))
    .catch((error) => {
      console.error("Erreur lors de la mise à jour de l'association tâche-catégorie :", error);
      res.status(500).send("Une erreur de modification est survenue.");
    });
};

// Supprimer une association tâche-catégorie
const deleteTaskCat = (req, res) => {
  const { id } = req.params;
  taskCatManager.delete({ id_taskCat: id }) // Utilisation correcte de l'ID
    .then(() => res.status(200).json({ message: "Suppression effectuée avec succès." }))
    .catch((error) => {
      console.error("Erreur lors de la suppression de l'association tâche-catégorie :", error);
      res.status(500).send("Une erreur est survenue lors de la suppression.");
    });
};

// Export des fonctions
module.exports = {
  getAllTaskCat,
  createTaskCat,
  updateTaskCat,
  deleteTaskCat,
};
